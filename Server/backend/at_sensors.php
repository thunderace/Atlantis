<?php
header ( "Access-Control-Allow-Origin: *" );
header ( 'Access-Control-Allow-Headers: origin, x-requested-with, content-type, accept' );
header ( 'Access-Control-Allow-Methods: GET, POST, PUT, DELETE' );

require_once __DIR__ . '/classes/connexion.php';
require_once __DIR__ . '/classes/checkAPI.php';
require_once __DIR__ . '/classes/Settings.php';
require_once __DIR__ . '/classes/Zwave.php';

$page_level = 1;
$settings = new Settings ();
$zwave = new Zwave ();

if (isset ( $_REQUEST ['api'] ) && checkAPI ( $_REQUEST ['api'], $page_level )) {
	switch ($_SERVER ['REQUEST_METHOD']) {
		case 'POST' :
			$zwave->discover ();
			http_response_code ( 202 );
			break;
		case 'GET' :
			echo json_encode ( get ( $_GET ) );
			break;
		case 'PUT' :
			update ( $_REQUEST );
			break;
		case 'DELETE' :
			break;
	}
} else if ($argc > 1) {
	switch ($argv [1]) {
		case 'history' :
			saveHistory ();
			break;
	}
}
function get($arr) {
	$zwave = new Zwave ();
	if (isset ( $arr ['id'] )) {
		$result = getDeviceDetails ( $arr ['id'] );
		$rooms = getRooms ();
		$output = array (
				'devices' => $result,
				'rooms' => $rooms 
		);
		return $result;
	} else {
		$devices_zwave = $zwave->loadDevices ();
		$result = array_merge ( $devices_zwave );
		$rooms = getRooms ();
		$output = array (
				'devices' => $result,
				'rooms' => $rooms 
		);
		return $output;
	}
}
function update($arr) {
	$zwave = new Zwave ();
	if (isset ( $arr ['toggle'], $arr ['value'] )) {
		$id = $arr ['toggle'];
		$cmd = $arr ['value'];
		$protocol = getProtocol ( $arr ['toggle'] );
		switch ($protocol) {
			case 'zwave' :
				echo $zwave->command ( $id, $cmd );
				break;
		}
	}
	if (isset ( $arr ['device'], $arr ['alias'], $arr ['room'] )) {
		($arr ['room'] == - 1) ? $room = NULL : $room = $arr ['room'];
		($arr ['alias'] == '') ? $alias = NULL : $alias = $arr ['alias'];
		$device = $arr ['device'];
		$bdd = getBDD ();
		$req = $bdd->exec ( "UPDATE at_sensors_devices SET `alias` = '$alias', `room` = '$room' WHERE id = '$device'" );
		if ($req == 1) {
			http_response_code ( 202 );
		} else {
			http_response_code ( 400 );
		}
	}
	if (isset ( $arr ['sensor'], $arr ['history'], $arr ['ignore'] )) {
		$sensor = $arr ['sensor'];
		$history = $arr ['history'];
		$ignore = $arr ['ignore'];
		$bdd = getBDD ();
		$req = $bdd->exec ( "UPDATE at_sensors SET `history` = '$history', `ignore` = '$ignore' WHERE id = '$sensor'" );
		echo json_encode ( $req );
		if ($req == 1) {
			http_response_code ( 202 );
		} else {
			http_response_code ( 400 );
		}
	}
}
function saveHistory() {
	$bdd = getBDD ();
	$zwave = new Zwave ();
	$req = $bdd->query ( 'SELECT * FROM at_sensors WHERE history = 1' );
	while ( $data = $req->fetch () ) {
		$id = $data ['id'];
		$sensor = $data ['sensor'];
		$protocol = $data ['protocol'];
		switch ($protocol) {
			case 'zwave' :
				$value = $zwave->getValue ( $sensor );
				$timestamp = $zwave->GetTimestamp ( $sensor );
				$date = date ( 'Y-m-d', $timestamp );
				$time = date ( 'H:i:s', $timestamp );
				$bdd->exec ( "INSERT INTO at_sensors_values VALUES ('', '$id', '$value', '$date', '$time')" );
				break;
		}
	}
}

if (false) {
	switch ($_GET ['action']) {
		case 'actionners' :
			$actionners = isset ( $_REQUEST ['id'] ) ? getActionners ( $_REQUEST ['id'] ) : getActionners ();
			echo json_encode ( $actionners );
			break;
		case 'interrupt' :
			if (isset ( $_REQUEST ['id'], $_REQUEST ['sensor'], $_REQUEST ['type'] )) {
				setInterrupt ( $_REQUEST ['id'], $_REQUEST ['sensor'], $_REQUEST ['type'] );
				echo 200;
			} else {
				echo 404;
			}
			break;
	}
}
function getProtocol($sensor) {
	$data = explode ( '_', $sensor );
	switch ($data [0]) {
		case 'ZWayVDev' :
			return 'zwave';
	}
}
function getDeviceDetails($device) {
	$bdd = getBDD ();
	$req = $bdd->query ( 'SELECT * FROM at_room' );
	$arr = array ();
	$arr_room = array ();
	while ( $data = $req->fetch () ) {
		$arr_room [] = array (
				'id' => $data ['id'],
				'room' => $data ['room'] 
		);
	}
	$req->closeCursor ();
	$req = $bdd->prepare ( 'SELECT * FROM at_sensors WHERE `device` = :device' );
	$data = $req->fetch ();
	if ($data) {
		$arr = array (
				'alias' => "" 
		);
	} else {
		echo 404;
	}
}
function getRooms() {
	$bdd = getBDD ();
	$req = $bdd->query ( 'SELECT * FROM at_room' );
	$arr = array ();
	while ( $data = $req->fetch () ) {
		$arr [] = array (
				'id' => $data ['id'],
				'room' => $data ['room'] 
		);
	}
	$req->closeCursor ();
	return $arr;
}
// function setSection($device, $alias, $room) {
// $bdd = getBDD ();
// $req = $bdd->prepare ( 'UPDATE at_sensors_devices SET `alias` = :alias, `room` = :room WHERE `device` = :device' );
// $req->execute ( array (
// 'alias' => $alias,
// 'room' => $room,
// 'device' => $device
// ) );
// $req->closeCursor ();
// }
// function setSensor($sensor, $history, $ignore) {
// $bdd = getBDD ();
// $req = $bdd->prepare ( 'UPDATE at_sensors SET `history` = :history, `ignore` = :ignore WHERE `sensor` = :sensor' );
// $req->execute ( array (
// 'history' => $history,
// 'ignore' => $ignore,
// 'sensor' => $sensor
// ) );
// $req->closeCursor ();
// }
function setInterrupt($id, $sensor, $type) {
	$bdd = getBDD ();
	$req = $bdd->prepare ( 'UPDATE at_switches SET `sensor` = :sensor, `type` = :type WHERE `switch` = :id' );
	$req->execute ( array (
			'sensor' => $sensor,
			'type' => $type,
			'id' => $id 
	) );
	$req->closeCursor ();
}
function getActionners($id = NULL) {
	$bdd = getBDD ();
	$req = $bdd->query ( 'SELECT * FROM at_sensors WHERE `type` = "switchBinary"' );
	$arr = array ();
	while ( $data = $req->fetch () ) {
		$arr [] = array (
				'id' => $data ['id'],
				'sensor' => $data ['sensor'],
				'device' => $data ['device'],
				'protocol' => $data ['protocol'],
				'type' => 'actionner' 
		);
	}
	$req->closeCursor ();
	if ($id != NULL) {
		$req2 = $bdd->prepare ( 'SELECT * FROM at_switches WHERE `switch` = :switch' );
		$req2->execute ( array (
				'switch' => $id 
		) );
		$data = $req2->fetch ();
		$interrupt = array (
				'switch' => $data ['switch'],
				'sensor' => $data ['sensor'],
				'type' => $data ['type'],
				'action' => $data ['action'] 
		);
		$req2->closeCursor ();
		$result = array (
				'interrupt' => $interrupt,
				'actionners' => $arr 
		);
		return $result;
	}
	return $arr;
}
