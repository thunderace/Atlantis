<?php
header ( "Access-Control-Allow-Origin: *" );

require_once __DIR__ . '/classes/connexion.php';
require_once __DIR__ . '/classes/checkAPI.php';
require_once __DIR__ . '/classes/Sync.php';

require_once __DIR__ . '/classes/Hue.php';

$page_level = 1;

if (isset ( $_REQUEST ['api'] ) && checkAPI ( $_REQUEST ['api'], $page_level )) {
	switch ($_SERVER ['REQUEST_METHOD']) {
		case 'GET' :
			if(isset($_GET['lastmodified'])){
				http_response_code(202);
				echo json_encode(get($_GET['lastmodified']));
			}else{
				http_response_code(400);
			}						
			break;
	}
} else {
	http_response_code ( 403 );
}

function get($lastmodified) {
	$sync = new Sync();
	$output = array();
	if($lastmodified < $sync->get(Sync::SCENARIOS)){
		$output[Sync::SCENARIOS] = getScenarios();
	}
	if($lastmodified < $sync->get(Sync::LIGHTS)){
		$output[Sync::LIGHTS] = getLights();
	}
	if($lastmodified < $sync->get(Sync::ROOMS)){
		$output[Sync::ROOMS] = getRooms();
	}
	if($lastmodified < $sync->get(Sync::PLANTS)){
		$output[Sync::PLANTS] = getPlants();
	}
	if($lastmodified < $sync->get(Sync::DEVICES)){
		$output[Sync::DEVICES] = getDevices();
	}
	if($lastmodified < $sync->get(Sync::SENSORS)){
		$output[Sync::SENSORS] = getSensors();
	}
	if($lastmodified < $sync->get(Sync::EAN)){
		$output[Sync::EAN] = getEan();
	}
	return $output;
}

function getEan() {
	$bdd = getBDD ();
	$req = $bdd->query ( 'SELECT * FROM at_ean ORDER BY nom' );
	$result = $req->fetchAll(PDO::FETCH_ASSOC);
	$req->closeCursor ();
	return $result;
}

function getCourses($lastmodified){
	$bdd = getBDD ();
	$req = $bdd->query ( "SELECT * FROM at_courses WHERE lastmodified > '$lastmodified' ORDER BY name" );
	$result = $req->fetchAll(PDO::FETCH_ASSOC);
	$req->closeCursor ();
	return $result;
}

function getScenarios(){
	$files = scandir ( __DIR__ . '/scenarios' );
	$result = array ();
	foreach ( $files as $file ) {
		if (pathinfo ( $file, PATHINFO_EXTENSION ) == 'php') {
			$file = pathinfo ( $file, PATHINFO_FILENAME );
			$xml = file_get_contents ( __DIR__ . '/scenarios/xml/' . $file . '.xml' );
			$php = file_get_contents ( __DIR__ . '/scenarios/' . $file . '.php' );
			$result [] = array (
					'file' => $file
			);
		}
	}
	return $result;
}

function getLights(){
	$bdd = getBDD ();
	$req = $bdd->query ( 'SELECT * FROM at_lights' );
	$result = $req->fetchAll(PDO::FETCH_ASSOC);
	$req->closeCursor();
	return $result;
}

function getPlants(){
	$bdd = getBDD ();
	$req = $bdd->query ( 'SELECT * FROM at_plants' );
	$result = $req->fetchAll(PDO::FETCH_ASSOC);
	$req->closeCursor();
	return $result;
}

function getDevices(){
	$bdd = getBDD ();
	$req = $bdd->query ( 'SELECT * FROM at_devices' );
	$result = $req->fetchAll(PDO::FETCH_ASSOC);
	$req->closeCursor();
	return $result;
}

function getSensors(){
	$bdd = getBDD ();
	
	$req_sensors = $bdd->query ( 'SELECT * FROM at_sensors' );
	$result_sensors = $req_sensors->fetchAll(PDO::FETCH_ASSOC);
	$req_sensors->closeCursor();
	
	$req_sensors_devices = $bdd->query ( 'SELECT * FROM at_sensors_devices' );
	$result_sensors_devices = $req_sensors_devices->fetchAll(PDO::FETCH_ASSOC);
	$req_sensors_devices->closeCursor();
	
	return array (
			'devices' => $result_sensors_devices,
			'sensors' => $result_sensors 
	);
}

function getRooms(){
	$bdd = getBDD ();
	$req = $bdd->query ( 'SELECT * FROM at_room' );
	$result = $req->fetchAll(PDO::FETCH_ASSOC);
	$req->closeCursor();
	return $result;
}