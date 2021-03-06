<?php
header ( 'Access-Control-Allow-Origin: *' );
header ( 'Access-Control-Allow-Headers: origin, x-requested-with, content-type, accept' );
header ( 'Access-Control-Allow-Methods: GET, POST, PUT, DELETE' );

require_once __DIR__ . '/classes/connexion.php';
require_once __DIR__ . '/classes/checkAPI.php';
require_once __DIR__ . '/classes/Settings.php';
require_once __DIR__ . '/classes/Hue.php';

$page_level = 1;
$settings = new Settings ();
$hue = new Hue ();

if (isset ( $_REQUEST ['api'] ) && checkAPI ( $_REQUEST ['api'], $page_level )) {
	switch ($_SERVER ['REQUEST_METHOD']) {
		case 'GET' :
			$result = get ();
			echo json_encode ( $result );
			break;
		case 'POST' :
			echo create ();
			break;
		case 'PUT' :
			echo put ( $_REQUEST );
			break;
		case 'DELETE' :
			if(checkAPI($_REQUEST['api'], $admin_level)){
				delete ( $_REQUEST );
			}
			break;
	}
} else {
	http_response_code ( 403 );
}
function put($arr) {
	$hue = new Hue ();
	if (isset ( $arr ['toggle'] )) {
		$hue->toggleLight ( $arr ['toggle'] );
		http_response_code ( 202 );
	}
	if (isset ( $arr ['bri'], $arr ['protocol'], $arr ['value'] )) {
		switch ($arr ['protocol']) {
			case 'hue' :
				$hue->setBrightness ( $arr ['bri'], $arr ['value'] );
				http_response_code ( 202 );
			default :
				http_response_code ( 404 );
		}
	}
	if (isset ( $arr ['color'], $arr ['value'] )) {
		$hue->setColor ( $arr ['color'], $arr ['value'] );
		http_response_code ( 202 );
	}
	if (isset ( $arr ['on'], $arr ['protocol'], $arr ['value'] )) {
		switch ($arr ['protocol']) {
			case 'hue' :
				$hue->on ( $arr ['on'], $arr ['value'] );
				http_response_code ( 202 );
			default :
				http_response_code ( 404 );
		}
	}
	if (isset ( $arr ['set'], $arr ['room'], $arr ['name'], $arr ['uid'] )) {
		$light = $arr ['set'];
		($arr ['room'] == - 1) ? $room = NULL : $room = $arr ['room'];
		setRoom ( $light, $room );
		$hue->setName ( $arr ['uid'], $arr ['name'] );
		(new Sync())->update(Sync::LIGHTS);
		http_response_code ( 202 );
	}
}
function get() {
	$hue = new Hue ();
	$rooms = getRooms ();
	$lights_hue = $hue->loadLights ();
	$output = array (
			'lights' => $lights_hue,
			'rooms' => $rooms 
	);
	http_response_code ( 202 );
	return $output;
}
function create() {
	$hue = new Hue ();
	$hue->discover ();
	(new Sync())->update(Sync::LIGHTS);
	return 200;
}
function delete($arr) {
	if (isset ( $arr ['id'] )) {
		$bdd = getBDD ();
		$id = $arr ['id'];
		$request = $bdd->exec ( "DELETE FROM at_lights WHERE id = '$id'" );
		if ($request == 1) {
			http_response_code ( 202 );
		} else {
			http_response_code ( 400 );
		}
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
function setRoom($light, $room) {
	$bdd = getBDD ();
	$req = $bdd->prepare ( 'UPDATE at_lights SET `room` = :room WHERE `id` = :light' );
	$req->execute ( array (
			'room' => $room,
			'light' => $light 
	) );
	$req->closeCursor ();
}
