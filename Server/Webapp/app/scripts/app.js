'use strict';

/**
 * @ngdoc overview
 * @name atlantisWebAppApp
 * @description # atlantisWebAppApp
 * 
 * Main module of the application.
 */

var TRANSLATION_EN = {
		'NAVIGATION_MENU_HOME': 'Home'
};
var TRANSLATION_FR = {
		'CLOSE': 'Fermer',
		'SHOW_ALL': 'Tout afficher',
		'SEARCH': 'Rechercher',
		'AT': 'à',
		'NAVIGATION_MENU_HOME': 'Accueil',
		'NAVIGATION_MENU_HOUSE': 'Domicile',
		'NAVIGATION_MENU_HOUSE_LIGHTS_SENSORS': 'Lumières et Capteurs',
		'NAVIGATION_MENU_HOUSE_PLANTS': 'Plantes',
		'NAVIGATION_MENU_HOUSE_CAMERAS': 'Caméras',
		'NAVIGATION_MENU_HOUSE_HISTORY': 'Historique',
		'NAVIGATION_MENU_SCENARIO': 'Scénarios',
		'NAVIGATION_MENU_SCENARIO_BLOCKLY': 'Créer un scénario',
		'NAVIGATION_MENU_SCENARIO_PHP': 'Créer un scénario (avancé)',
		'NAVIGATION_MENU_CONTENT': 'Contenu',
		'NAVIGATION_MENU_CONTENT_KITCHEN': 'Cuisine',
		'NAVIGATION_MENU_CONTENT_PHARMACY': 'Pharmacie',
		'NAVIGATION_MENU_CONTENT_CLEANING': 'Hygiène et Entretien',
		'NAVIGATION_MENU_SERVICES': 'Services',
		'NAVIGATION_MENU_SERVICES_MUSIC': 'Musique',
		'NAVIGATION_MENU_SERVICES_GEO': 'Géolocalisation',
		'NAVIGATION_MENU_SERVICES_CONNECTED_DEVICES': 'Appareils Connectés',
		'NAVIGATION_MENU_SERVICES_CLOUD': 'Cloud',
		'NAVIGATION_MENU_SETTINGS': 'Paramètres',
		'NAVIGATION_MENU_LOGOUT': 'Déconnexion',
		'VIEW_LOGIN_AUTHENTICATION': 'Authentification',
		'VIEW_LOGIN_USERNAME': 'Nom d\'utilisateur',
		'VIEW_LOGIN_PASSWORD': 'Mot de passe',
		'VIEW_HOME_WELCOME': 'Bienvenue !',
		'VIEW_HOME_TODAY': 'Aujourd\'hui',
		'VIEW_HOME_TOMORROW': 'Demain',
		'VIEW_HOME_SHOPPING_LIST': 'Liste des courses',
		'VIEW_HOME_SHOPPING_LIST_ADD': 'Ajoutez (Nom, Quantité)',
		'VIEW_HOME_HOUSE': 'Domicile',
		'VIEW_HOME_PLAN_UPLOAD': 'Déposez le plan de votre domicile ici.',
		'VIEW_ROOM_ROOMS': 'Pièces',
		'VIEW_ROOM_ADD': 'Ajoutez une pièce',
		'VIEW_SENSORS_LIGHTS': 'Lumières',
		'VIEW_SENSORS_SENSORS': 'Capteurs',
		'VIEW_PLANTS_BATTERY': 'Autonomie',
		'VIEW_PLANTS_HUMIDITY': 'Humidité',
		'VIEW_PLANTS_CONDUCTIVITY': 'Conductivité',
		'VIEW_PLANTS_LUMINOSITY': 'Luminosité',
		'VIEW_PLANTS_TEMPERATURE_SOIL': 'Température Terreau',
		'VIEW_PLANTS_TEMPERATURE_AIR': 'Température Air',
		'VIEW_PLANTS_LAST_UPDATE' : 'Dernière mise à jour',
		'VIEW_CAMERAS_TYPE': 'Type',
		'VIEW_CAMERAS_IP_ADDRESS': 'Adresse IP',
		'VIEW_CAMERAS_IMAGE': 'Image',
		'VIEW_CAMERAS_VIDEO': 'Vidéo',
		'VIEW_HISTORY_OPTIONS': 'Options',
		'VIEW_HISTORY_SENSOR': 'Capteur',
		'VIEW_HISTORY_PLANT': 'Plante',
		'VIEW_HISTORY_FROM': 'De',
		'VIEW_HISTORY_TO': 'Jusqu\'à',
		'VIEW_SCENARIO_CONTROLS': 'Contrôles',
		'VIEW_SCENARIO_SCENARIO': 'Scénario',
		'VIEW_SCENARIO_SCENARIO_NAME': 'Nom du scénario',
		'VIEW_SCENARIO_NEW': 'Nouveau',
		'VIEW_SCENARIO_SAVE': 'Enregistrer',
		'VIEW_SCENARIO_DELETE': 'Supprimer',
		'VIEW_SCENARIO_SENSORS': 'Capteurs',
		'VIEW_SCENARIO_LOGIC': 'Logique',
		'VIEW_SCENARIO_CONTROL': 'Contrôle',
		'VIEW_KITCHEN_SEARCH': 'Rechercher',
		'VIEW_KITCHEN_SHOW_ALL': 'Tout afficher',
		'VIEW_KITCHEN_CLOSET': 'Placard',
		'VIEW_KITCHEN_FRIDGE': 'Fridge',
		'VIEW_KITCHEN_FREEZER': 'Congélateur',
		'VIEW_PHARMACY_SEARCH': 'Rechercher',
		'VIEW_PHARMACY_PHARMACY': 'Pharmacie',
		'VIEW_CLEANING_SEARCH': 'Rechercher',
		'VIEW_CLEANING_CLEANING': 'Hygiène et Entretien',
		'VIEW_MUSIC_CONTROLS': 'Contrôles',
		'VIEW_MUSIC_LIBRARY': 'Musicothèque',
		'VIEW_MUSIC_SEARCH': 'Rechercher',
		'VIEW_MUSIC_PLAYLISTS': 'Listes de lecture',
		'VIEW_MUSIC_SHOW_ALL': 'Tout afficher',
		'VIEW_MUSIC_TRACKS': 'Morceaux',
		'VIEW_MUSIC_REFRESH': 'Actualiser',
		'VIEW_DEVICES_SEARCH': 'Rechercher',
		'VIEW_DEVICES_CONNECTED_DEVICES': 'Appareils Connectés',
		'VIEW_SETTINGS_TAB_SYSTEM': 'Etat Système',
		'VIEW_SETTINGS_TAB_ATLANTIS': 'Paramètres Atlantis',
		'VIEW_SETTINGS_TAB_SECURITY': 'Sécurité',
		'VIEW_SETTINGS_TAB_USERS': 'Utilisateurs',
		'VIEW_SETTINGS_DAEMON': 'Daemon',
		'VIEW_SETTINGS_DAEMON_START': 'Démarrage',
		'VIEW_SETTINGS_DAEMON_STOP': 'Arrêt',
		'VIEW_SETTINGS_DAEMON_STATUS': 'Etat',
		'VIEW_SETTINGS_MODE': 'Mode',
		'VIEW_SETTINGS_MODE_NIGHT': 'Activer le mode nuit',
		'VIEW_SETTINGS_MODE_FROM': 'De',
		'VIEW_SETTINGS_MODE_TO': 'À',
		'VIEW_SETTINGS_SERVER': 'Serveur',
		'VIEW_SETTINGS_SERVER_FREE_SPACE': 'Espace libre',
		'VIEW_SETTINGS_CALL_LIGHT': 'Signalisation avec la lumière',
		'VIEW_SETTINGS_CALL_VOICE': 'Signalisation avec la voix',
		
};

var nApp = angular.module('atlantisWebAppApp', [ 'ngRoute', 'ngMap',
		'chart.js', 'ab-base64', 'ngStorage', 'ngMaterial', 'ngSanitize',
		'ngFileUpload', 'ui.ace', 'pascalprecht.translate' ]);

var toastPosition = {
	bottom : false,
	top : true,
	left : false,
	right : true
};

nApp.config(function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl : 'views/home.html',
		controller : 'HomeCtrl'
	}).when('/contenu', {
		templateUrl : 'views/contenu.html',
		controller : 'ContenuCtrl'
	}).when('/pharmacie', {
		templateUrl : 'views/pharmacie.html',
		controller : 'PharmacieCtrl'
	}).when('/entretien', {
		templateUrl : 'views/entretien.html',
		controller : 'EntretienCtrl'
	}).when('/devices', {
		templateUrl : 'views/devices.html',
		controller : 'DevicesCtrl'
	}).when('/sensors', {
		templateUrl : 'views/sensors.html',
		controller : 'SensorsCtrl'
	}).when('/geo', {
		templateUrl : 'views/geo.html',
		controller : 'GeoCtrl'
	}).when('/login', {
		templateUrl : 'views/login.html',
		controller : 'LoginCtrl'
	}).when('/music', {
		templateUrl : 'views/music.html',
		controller : 'MusicCtrl'
	}).when('/deconnexion', {
		templateUrl : 'views/deconnexion.html',
		controller : 'DeconnexionCtrl'
	}).when('/settings', {
		templateUrl : 'views/settings.html',
		controller : 'SettingsCtrl'
	}).when('/plantes', {
		templateUrl : 'views/plantes.html',
		controller : 'PlantesCtrl'
	}).when('/history', {
		templateUrl : 'views/history.html',
		controller : 'HistoryCtrl'
	}).when('/scenario', {
		templateUrl : 'views/scenario.html',
		controller : 'ScenarioCtrl'
	}).when('/cameras', {
		templateUrl : 'views/cameras.html',
		controller : 'CamerasCtrl'
	}).when('/scenario2', {
		templateUrl : 'views/scenario_advanced.html',
		controller : 'ScenarioAdvancedCtrl',
		controllerAs : 'scenarioAdvanced'
	}).otherwise({
		redirectTo : '/home'
	});
});

nApp.config(function($translateProvider){
	$translateProvider.translations('en', TRANSLATION_EN);
	$translateProvider.translations('fr', TRANSLATION_FR);
	$translateProvider.preferredLanguage('fr');
});

nApp.run(function($rootScope, $location, $sessionStorage) {
	$rootScope.$on("$routeChangeStart", function(event, next, current) {
		if ($sessionStorage.api == null) {
			$rootScope.navigation = true;
			$location.path('/login');
		}
	});
});

nApp.filter('firstUpper', function() {
	return function(input, scope) {
		return input ? input.substring(0, 1).toUpperCase()
				+ input.substring(1).toLowerCase() : "";
	}
});

function getDateUnit(day, $window) {
	day = $window.Math.abs(day);
	if (day > 365) {
		return $window.Math.round(day / 365) + ' ans';
	}
	if (day > 30) {
		return $window.Math.round(day / 30) + ' mois';
	}
	return day + ' jours';
}

function getToastPosition() {
	return Object.keys(toastPosition).filter(function(pos) {
		return toastPosition[pos];
	}).join(' ');
}

function showToast($mdToast, status, data) {
	if (status == 202) {
		$mdToast.show($mdToast.simple().content(
				'Modifications effectuées avec succès !').position(
				getToastPosition()).hideDelay(1500));
	} else {
		$mdToast.show($mdToast.simple().content(
				'Erreur : ' + status + ' - ' + data).position(
				getToastPosition()).hideDelay(5000));
	}
}

function showToast($mdToast, message) {
	$mdToast.show($mdToast.simple().content(message).position(
			getToastPosition()).hideDelay(3000));
}

