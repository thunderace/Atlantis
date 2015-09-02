"use strict";function getDateUnit(a,b){return a=b.Math.abs(a),a>365?b.Math.round(a/365)+" ans":a>30?b.Math.round(a/30)+" mois":a+" jours"}function getToastPosition(){return Object.keys(toastPosition).filter(function(a){return toastPosition[a]}).join(" ")}function showToast(a,b,c){202==b?a.show(a.simple().content("Modifications effectuées avec succès !").position(getToastPosition()).hideDelay(1500)):a.show(a.simple().content("Erreur : "+b+" - "+c).position(getToastPosition()).hideDelay(5e3))}function showToast(a,b){a.show(a.simple().content(b).position(getToastPosition()).hideDelay(3e3))}var nApp=angular.module("atlantisWebAppApp",["ngRoute","ngMap","ab-base64","ngStorage","nouislider","ngMaterial","ngSanitize","angularModalService","ngFileUpload"]),toastPosition={bottom:!1,top:!0,left:!1,right:!0};nApp.config(["$routeProvider",function(a){a.when("/home",{templateUrl:"views/home.html",controller:"HomeCtrl"}).when("/contenu",{templateUrl:"views/contenu.html",controller:"ContenuCtrl"}).when("/pharmacie",{templateUrl:"views/pharmacie.html",controller:"PharmacieCtrl"}).when("/entretien",{templateUrl:"views/entretien.html",controller:"EntretienCtrl"}).when("/devices",{templateUrl:"views/devices.html",controller:"DevicesCtrl"}).when("/sensors",{templateUrl:"views/sensors.html",controller:"SensorsCtrl"}).when("/geo",{templateUrl:"views/geo.html",controller:"GeoCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/music",{templateUrl:"views/music.html",controller:"MusicCtrl"}).when("/deconnexion",{templateUrl:"views/deconnexion.html",controller:"DeconnexionCtrl"}).when("/settings",{templateUrl:"views/settings.html",controller:"SettingsCtrl"}).when("/plantes",{templateUrl:"views/plantes.html",controller:"PlantesCtrl"}).otherwise({redirectTo:"/home"})}]),nApp.run(["$rootScope","$location","$sessionStorage",function(a,b,c){a.$on("$routeChangeStart",function(d,e,f){null==c.api&&(a.navigation=!0,b.path("/login"))})}]),nApp.filter("firstUpper",function(){return function(a,b){return a?a.substring(0,1).toUpperCase()+a.substring(1).toLowerCase():""}}),angular.module("atlantisWebAppApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),nApp.controller("ContenuCtrl",["$scope","$http","$window","$sessionStorage","$filter","$mdDialog","AtlantisUri",function(a,b,c,d,e,f,g){function h(){var c=g.Cuisine()+"?api="+d.api;b.get(c).success(function(b,c){a.data=b,a.frigos=e("filter")(b,{endroit:"frigidaire"}),a.congelos=e("filter")(b,{endroit:"congelateur"}),a.placards=e("filter")(b,{endroit:"placard"})})}function i(){a.frigos=e("filter")(a.data,{endroit:"frigidaire"}),a.congelos=e("filter")(a.data,{endroit:"congelateur"}),a.placards=e("filter")(a.data,{endroit:"placard"})}h(),a.add=function(b){f.show({templateUrl:"views/cuisine_add.html",targetEvent:b,controller:"CuisineAddCtrl"}).then(function(b){a.data.push(b),a.data=e("orderBy")(a.data,"peremption"),i()},function(){})},a.filter=function(b){if(null==b||""==b)i();else{var c=[];angular.forEach(a.data,function(a){e("lowercase")(a.label).indexOf(e("lowercase")(b))>-1&&c.push(a)}),a.frigos=e("filter")(c,{endroit:"frigidaire"}),a.congelos=e("filter")(c,{endroit:"congelateur"}),a.placards=e("filter")(c,{endroit:"placard"})}},a.open=function(a){var c=g.Cuisine()+"?api="+d.api+"&open="+a.id;b.put(c).success(function(b,c){202==c&&(a.status=1)})},a.ignore=function(a){var c=g.Cuisine()+"?api="+d.api+"&ignore="+a.id;b.put(c).success(function(b,c){202==c&&(a.ignore=1)})},a.modify=function(c,e){switch(e){case"+":var f=g.Cuisine()+"?api="+d.api;f+="&id="+c.id+"&quantite="+(parseInt(c.quantite)+1),b.put(f).success(function(a,b){200==b&&(c.quantite=parseInt(c.quantite)+1)});break;case"-":var f=g.Cuisine()+"?api="+d.api;f+="&id="+c.id+"&quantite="+(parseInt(c.quantite)-1)+"&close=true",b.put(f).success(function(a,b){200==b&&(c.quantite=parseInt(c.quantite)-1,c.status=0)});break;case".":var f=g.Cuisine()+"?api="+d.api+"&id="+c.id;b["delete"](f).success(function(b,d){var e=a.data.indexOf(c);a.data.splice(e,1),i()})}},a.status=function(a,b,c){return"congelateur"==c?"images/ng_ball_blue.png":0>a?"images/ng_ball_red.png":1==b?"images/ng_ball_orange.png":"frigidaire"==c?"images/ng_ball_green.png":"images/ng_empty.png"},a.peremption=function(a,b,d){return"congelateur"==d?"Congelé depuis "+getDateUnit(a,c):0>a?"Périmé depuis "+getDateUnit(a,c):1==b?"Ouvert depuis "+getDateUnit(a,c):"A consommer dans "+getDateUnit(a,c)}}]);var nApp=angular.module("atlantisWebAppApp");nApp.controller("PharmacieCtrl",["$scope","$sessionStorage","$http","$window","$mdDialog","$filter","AtlantisUri",function(a,b,c,d,e,f,g){function h(){var d=g.Pharmacie()+"?api="+b.api;c.get(d).success(function(b,c){202==c&&(a.pharmacies=b,a.data=b)})}h(),a.add=function(b){e.show({templateUrl:"views/pharmacie_add.html",targetEvent:b,controller:"PharmacieAddCtrl"}).then(function(b){a.data.push(b),a.data=f("orderBy")(a.data,"peremption"),a.pharmacies=a.data})},a.filter=function(b){if(null==b||""==b)a.pharmacies=a.data;else{var c=[];angular.forEach(a.data,function(a){f("lowercase")(a.nom).indexOf(f("lowercase")(b))>-1&&c.push(a)}),a.pharmacies=c}},a.modify=function(d,e){switch(e){case"+":var f=g.Pharmacie()+"?api="+b.api;f+="&id="+d.id+"&qte="+(parseInt(d.quantite)+1),c.put(f).success(function(a,b){202==b&&(d.quantite=parseInt(d.quantite)+1)});break;case"-":var h=g.Pharmacie()+"?api="+b.api;h+="&id="+d.id+"&qte="+(parseInt(d.quantite)-1),c.put(h).success(function(a,b){202==b&&(d.quantite=parseInt(d.quantite)-1)});break;case".":var i=g.Pharmacie()+"?api="+b.api;i+="&id="+d.id,c["delete"](i).success(function(b,c){if(202==c){var e=a.data.indexOf(d);a.data.splice(e,1),a.pharmacies=a.data}})}},a.peremption=function(a){return 0>a?"Périmé depuis "+getDateUnit(a,d):"Valable encore "+getDateUnit(a,d)},a.status=function(a){return 0>a?"images/ng_ball_red.png":"images/ng_empty.png"}}]);var nApp=angular.module("atlantisWebAppApp");nApp.controller("EntretienCtrl",["$scope","$sessionStorage","$http","$window","$mdDialog","$filter","AtlantisUri",function(a,b,c,d,e,f,g){function h(){var d=g.Entretien()+"?api="+b.api;c.get(d).success(function(b,c){202==c&&(a.data=b,a.entretiens=b)})}h(),a.add=function(b){e.show({templateUrl:"views/entretien_add.html",targetEvent:b,controller:"EntretienAddCtrl"}).then(function(b){a.data.push(b),a.data=f("orderBy")(a.data,"peremption"),a.entretiens=a.data})},a.filter=function(b){if(null==b||""==b)a.entretiens=a.data;else{var c=[];angular.forEach(a.data,function(a){f("lowercase")(a.nom).indexOf(f("lowercase")(b))>-1&&c.push(a)}),a.entretiens=c}},a.modify=function(d,e){switch(e){case"+":var f=g.Entretien()+"?api="+b.api;f+="&id="+d.id+"&qte="+(parseInt(d.quantite)+1),c.put(f).success(function(a,b){202==b&&(d.quantite=parseInt(d.quantite)+1)});break;case"-":var f=g.Entretien()+"?api="+b.api;f+="&id="+d.id+"&qte="+(parseInt(d.quantite)-1),c.put(f).success(function(a,b){202==b&&(d.quantite=parseInt(d.quantite)-1)});break;case".":var f=g.Entretien()+"?api="+b.api;f+="&id="+d.id,c["delete"](f).success(function(b,c){if(202==c){var e=a.data.indexOf(d);a.data.splice(e,1),a.entretiens=a.data}})}},a.peremption=function(a){return 0>a?"Périmé depuis "+getDateUnit(a,d):"Valable encore "+getDateUnit(a,d)},a.status=function(a){return 0>a?"images/ng_ball_red.png":"images/ng_empty.png"}}]),nApp.controller("DevicesCtrl",["$scope","$http","$filter","$localStorage","$sessionStorage","$mdDialog","AtlantisUri",function(a,b,c,d,e,f,g){function h(){f.show({templateUrl:"views/wait.html"});var c=g.Devices()+"?api="+e.api;b.get(c).success(function(b,c){a.devices=b.devices,a.data=b.devices,a.users=b.users,f.hide()})}h(),a.add=function(b){f.show({templateUrl:"views/devices_add.html",targetEvent:b,controller:"DevicesAddCtrl",locals:{users:a.users,device:null}}).then(function(b){a.data.push(b),a.data=c("orderBy")(a.data,"nom"),a.devices=a.data},function(){})},a.ping=function(a){var c=g.Devices()+"?api="+e.api+"&ping="+a.ip;b.get(c).success(function(b,c){202==c&&(a.online=b.online)})},a.del=function(c){var d=g.Devices()+"?api="+e.api;d+="&id="+c.id,b["delete"](d).success(function(b,d){if(202==d){var e=a.data.indexOf(c);a.data.splice(e,1),a.devices=a.data}})},a.edit=function(b,c){f.show({templateUrl:"views/devices_add.html",targetEvent:c,controller:"DevicesAddCtrl",locals:{users:a.users,device:b}}).then(function(a){b.nom=a.nom,b.ip=a.ip,b.mac=a.mac,b.type=a.type,b.connexion=a.connexion,b.username=a.username},function(){})},a.filter=function(b){if(null==b||""==b)a.devices=a.data;else{var d=[];angular.forEach(a.data,function(a){(c("lowercase")(a.nom).indexOf(c("lowercase")(b))>-1||c("lowercase")(a.ip).indexOf(c("lowercase")(b))>-1)&&d.push(a)}),a.devices=d}},a.connection=function(a){switch(a){case"wifi":return"images/ng_wifi.png";case"ethernet":return"images/ng_ethernet.png"}},a.status=function(a){switch(a){case 1:return"images/ng_ball_green.png";case-1:return"images/ng_ball_red.png"}},a.type=function(a){switch(a){case"smartphone":return"url(images/ng_smartphone.png)";case"linux":return"url(images/ng_server.png)";case"windows":return"url(images/ng_windows.png)";case"imprimante":return"url(images/ng_printer.png)";default:return"url(images/ng_device.png)"}}}]);var nApp=angular.module("atlantisWebAppApp");nApp.controller("SensorsCtrl",["$scope","$http","$sessionStorage","$filter","$sce","ModalService","$rootScope","AtlantisUri",function(a,b,c,d,e,f,g,h){function i(a,b){var d=h.Lights()+"?api="+c.api;b.get(d).success(function(b,c){a.lights=b.lights})}function j(a,b){var d=h.Sensors()+"?api="+c.api+"&action=get";b.get(d).success(function(b,c){a.sensors=b.devices,g.rooms=b.rooms})}function k(a,b){var b=d("filter")(a.rooms,{id:b});return 1==b.length?b[0].room:""}i(a,b),j(a,b);var l={from:0,to:10,step:1};a.options=l,a.reachable=function(a){return a?"images/ng_empty.png":"images/ng_ball_red.png"},a.changeBright=function(a){var d=h.Lights()+"?api="+c.api;d+="&bri="+a.uid+"&protocol="+a.protocol+"&value="+a.brightness,b.put(d).success(function(a,b){})},a.toggleLight=function(a){var d=h.Lights()+"?api="+c.api;d+="&on="+a.uid+"&protocol="+a.protocol+"&value="+a.on,b.put(d).success(function(a,b,c,d){})},a.modifyLight=function(a){f.showModal({templateUrl:"views/light_settings.html",controller:"LightSettingsCtrl",inputs:{light:a}}).then(function(a){a.element.modal({backdrop:"static",keyboard:!1}),a.close.then(function(a){})})},a.sensorPic=function(a){switch(a){case"section":return"images/ng_empty.png";case"Battery":return"images/ng_battery.png";case"Tamper":return"images/ng_alert.png";case"Temperature":return"images/ng_thermostat.png";case"Luminiscence":return"images/ng_sun.png";default:return"images/ng_device.png"}},a.sensorDesc=function(b){switch(b.type){case"section":return e.trustAsHtml('<md-divider style="margin-bottom:10px"></md-divider><b>'+d("uppercase")(b.alias)+(null==b.room||""==b.room?"":" ("+k(a,b.room)+")")+"</b>");case"Battery":return"Autonomie : "+b.value+" %";case"Tamper":return b.value;case"Temperature":return"Température : "+b.value+" "+b.unit;case"Luminiscence":return"Luminosité : "+b.value+" "+b.unit;default:return b.value+" "+b.unit}}}]),nApp.controller("GeoCtrl",["$scope","$http","$sessionStorage","$rootScope","AtlantisUri",function(a,b,c,d,e){function f(){var d=e.Geo()+"?api="+c.api+"&action=get";b.get(d).success(function(b,c){200==c&&(a.devices=b)})}a.home={lat:0,"long":0},f(),a.request=function(){var a=e.Geo()+"?api="+c.api+"&action=request";b.get(a)},a.getLocation=function(){var d=e.Geo()+"?api="+c.api+"&action=get";b.get(d).success(function(b,c){200==c&&a.devices.push(b),console.log(b)})}}]),nApp.controller("LoginCtrl",["$scope","$http","base64","$sessionStorage","$rootScope","$location","AtlantisUri",function(a,b,c,d,e,f,g){a.auth=function(){var h=a.user.username,i=a.user.password,j=g.Login();b.defaults.headers.common.Authorization=c.encode(h+":"+i),b.get(j).success(function(c,g,h,i){202==g?(a.user=null,e.navigation=!1,d.api=c,delete b.defaults.headers.common.Authorization,f.path("/home")):console.log(g,c)})}}]),nApp.controller("MusicCtrl",["$scope","$http","$sessionStorage","$filter","AtlantisUri",function(a,b,c,d,e){function f(){var f=e.Music()+"?api="+c.api;f+="&action=init",b.get(f).success(function(b,c){200==c&&(a.on=1==b.on,a.welcome=-1!=b.welcome.id,a.playlists=d("filter")(b.songs,{type:"playlist"}),a.songs=d("filter")(b.songs,{type:"song"}),a.volume=b.vol,a.welcomeSong=b.welcome.id)})}f(),a.toggleMusic=function(){var d=e.Music()+"?api="+c.api+"&action=";d+=a.on?"on":"off",b.get(d)},a.action=function(a){var d="";switch(a){case"stop":d=e.Music()+"?api="+c.api+"&action=stop";break;case"pause":d=e.Music()+"?api="+c.api+"&action=pause";break;case"repeat":d=e.Music()+"?api="+c.api+"&action=repeat";break;case"previous":d=e.Music()+"?api="+c.api+"&action=previous";break;case"next":d=e.Music()+"?api="+c.api+"&action=next";break;case"shuffle":d=e.Music()+"?api="+c.api+"&action=shuffle";break;case"refresh":d=e.Music()+"?api="+c.api+"&action=search"}b.get(d).success(function(a,b){})},a.play=function(a){if("song"==a.type){var d=e.Music()+"?api="+c.api+"&action=play&id="+a.id;b.get(d).success(function(a,b){})}else{var d=e.Music()+"?api="+c.api+"&action=playlistplay&playlist="+a.id;b.get(d).success(function(a,b){})}},a.speak=function(){var d=e.Speech()+"?api="+c.api;d+="&action=speaker&text="+encodeURI(a.message),b.get(d).success(function(a,b){console.log(b+" : "+a)})},a.changeVol=function(a){var d=e.Music()+"?api="+c.api;d+="&action=vol&source=1&level="+a,b.get(d).success(function(a,b){console.log(a)})},a.songPic=function(b){switch(b.type){case"playlist":return"images/music/ng_note_double.png";case"song":return b.id==a.welcomeSong?"images/music/ng_note_white.png":"images/music/ng_note.png"}}}]),nApp.controller("HomeCtrl",["$scope","$rootScope","$http","$sessionStorage","$filter","$mdDialog","$window","AtlantisUri",function(a,b,c,d,e,f,g,h){function i(){var b=h.Courses()+"?api="+d.api;c.get(b).success(function(b,c){202==c&&(a.courses=b)})}function j(){var b=h.Home()+"?api="+d.api;c.get(b).success(function(b,c){a.alarm=b.alarm,d.rooms=b.rooms,a.weather=[],a.day1=k(b.weather[0].code),a.day2=k(b.weather[1].code),a.meteo1=e("firstUpper")(b.weather[0].description)+" "+b.weather[0].temperature+"°",a.meteo2=e("firstUpper")(b.weather[1].description)+" "+b.weather[1].temperature+"°"})}function k(a){var b=e("limitTo")(a,a.length-1);switch(b){case"01":return"images/weather/ng_weather_sun.png";case"02":case"03":case"04":case"11":return"images/weather/ng_weather_cloud.png";case"09":case"10":return"images/weather/ng_weather_heavy.png";case"13":return"images/weather/ng_weather_snow.png";case"50":return"images/weather/ng_weather_fog.png"}}j(),i(),a.toggleAlarm=function(){var b=h.Home()+"?api="+d.api+"&alarm="+a.alarm;c.put(b).success(function(a,b){console.log(b),console.log(a)})},a.addCourse=function(b){var e=h.Courses()+"?api="+d.api;if(null!=a.item){var f=a.item.split(",");e+="&name="+f[0],2==f.length&&(e+="&quantity="+parseInt(f[1])),c.post(e).success(function(b,c){202==c&&(i(),a.item=null)})}},a.modifyCourse=function(b,e){var f=h.Courses()+"?api="+d.api+"&id="+b.id;switch(e){case"+":f+="&quantity="+(parseInt(b.quantity)+1),c.put(f).success(function(a,c){console.log(c),console.log(a),202==c&&(b.quantity=parseInt(b.quantity)+1)});break;case"-":f+="&quantity="+(parseInt(b.quantity)-1),c.put(f).success(function(a,c){202==c&&(b.quantity=parseInt(b.quantity)-1)});break;case".":c["delete"](f).success(function(c,d){if(202==d){var e=a.courses.indexOf(b);a.courses.splice(e,1)}})}},a.editHome=function(a){f.show({templateUrl:"views/room.html",controller:"RoomCtrl"})},a.planHome=function(a){f.show({templateUrl:"views/home_plan.html",controller:"HomePlanCtrl"}).then(function(){g.location.reload()})}}]),nApp.controller("LightSettingsCtrl",["$scope","$filter","$rootScope","$element","close","light",function(a,b,c,d,e,f){a.light=f;var g=b("filter")(c.rooms,{id:f.room});a.room=g[0],console.log(g),a.close=function(){e({light:a.light},200)},a.cancel=function(){d.modal("hide"),e({light:a.light},200)}}]),nApp.controller("DeconnexionCtrl",["$scope","$sessionStorage","$rootScope","$location",function(a,b,c,d){delete b.api,c.navigation=!0,d.path("/login")}]),nApp.controller("SettingsCtrl",["$scope","$mdDialog",function(a,b){function c(){var b=[];b.push({id:0,label:"Administrateur"}),b.push({id:1,label:"Utilisateur"}),b.push({id:2,label:"Visiteur"}),a.types=b}c()}]),nApp.factory("AtlantisUri",function(){var a="../";return{Courses:function(){return a+"backend/at_courses.php"},Cuisine:function(){return a+"backend/at_cuisine.php"},Devices:function(){return a+"backend/at_ccdevices.php"},Ean:function(){return a+"backend/at_ean.php"},Entretien:function(){return a+"backend/at_entretien.php"},Geo:function(){return a+"backend/at_geo.php"},Home:function(){return a+"backend/at_home.php"},Lights:function(){return a+"backend/at_lights.php"},Login:function(){return a+"backend/at_auth.php"},Music:function(){return a+"backend/at_music.php"},Pharmacie:function(){return a+"backend/at_pharmacie.php"},Rooms:function(){return a+"backend/at_rooms.php"},Sensors:function(){return a+"backend/at_sensors.php"},Speech:function(){return a+"backend/at_speech.php"},Settings:function(){return a+"backend/at_settings.php"},Users:function(){return a+"backend/at_users.php"}}}),nApp.controller("UserAddCtrl",["$scope","$http","$sessionStorage","$mdDialog","$mdToast","AtlantisUri","user",function(a,b,c,d,e,f,g){function h(){var h=f.Users()+"?api="+c.api;null==g?(h+="&name="+a.user.name+"&type="+a.user.type.id+"&pwd="+a.user.pwd,b.post(h).success(function(a,b){202==b?d.hide(a):showToast(e,b,a)})):(h+="&id="+g.id+"&type="+a.user.type.id+"&mail="+a.user.mail+"&phone="+a.user.phone,null!=a.user.pwd&&""!=a.user.pwd&&(h+="&pwd="+a.user.pwd),b.put(h).success(function(b,c){showToast(e,c,b),202==c&&(g.mail=a.user.mail,g.phone=a.user.phone,g.type=a.user.type.id,d.hide(g))}))}a.types=[{id:0,label:"Administrateur"},{id:1,label:"Utilisateur"},{id:2,label:"Visiteur"}],null!=g?(a.user={name:g.nom,phone:g.phone,mail:g.mail,type:{id:g.type}},a.btnSubmit="Modifiez"):a.btnSubmit="Ajoutez",a.submit=function(){h()},a.cancel=function(){d.cancel()}}]),nApp.controller("UsersSettingsCtrl",["$scope","$http","$sessionStorage","$filter","$mdDialog","AtlantisUri",function(a,b,c,d,e,f){a.addUser=function(b){e.show({templateUrl:"views/user_add.html",targetEvent:b,controller:"UserAddCtrl",locals:{user:null}}).then(function(b){null!=b&&a.users.push(b)},function(){})},a.changeAPI=function(a){var d=f.Users()+"?api="+c.api+"&cle="+a.id;b.put(d).success(function(b,c){202==c&&(a.cle=b)})},a.editUser=function(a,b){e.show({templateUrl:"views/user_add.html",targetEvent:b,controller:"UserAddCtrl",locals:{user:a}}).then(function(b){a=b},function(){})},a.delUser=function(d){var e=f.Users()+"?api="+c.api+"&id="+d.id;b["delete"](e).success(function(b,c){if(202==c){var e=a.users.indexOf(d);a.users.splice(e,1)}})};var g=f.Users()+"?api="+c.api;b.get(g).success(function(b,c){202==c&&(a.users=b)})}]),nApp.controller("AtlantisSettingsCtrl",["$scope","$http","$sessionStorage","$mdToast","AtlantisUri",function(a,b,c,d,e){var f=e.Settings()+"?api="+c.api;b.get(f).success(function(b,c){202==c&&(a.atlantis=b)}),a.saveGeneral=function(){var f=a.atlantis[0].url,g=a.atlantis[0].dep,h=a.atlantis[0].city,i=a.atlantis[0].lat,j=a.atlantis[0]["long"],k=a.atlantis[0].radius,l=e.Settings()+"?api="+c.api;l+="&section=Atlantis&url="+f+"&dep="+g+"&city="+h+"&lat="+i+"&long="+j+"&radius="+k,b.put(l).success(function(a,b){showToast(d,b,a)})},a.saveNotification=function(){var f=a.atlantis[1].key,g=e.Settings()+"?api="+c.api;g+="&section=Notification&key="+f,b.put(g).success(function(a,b){showToast(d,b,a)})},a.saveSensors=function(){var f=a.atlantis[6].ip,g=a.atlantis[6].user,h=a.atlantis[3].IP,i=a.atlantis[3].Port,j=e.Settings()+"?api="+c.api;j+="&section=Zwave&ip="+h+"&port="+i,b.put(j).success(function(a,b){showToast(d,b,a)}),j=e.Settings()+"?api="+c.api,j+="&section=Hue&ip="+f+"&user="+g,b.put(j).success(function(a,b){showToast(d,b,a)})}}]),angular.module("atlantisWebAppApp").controller("SecuritySettingsCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),nApp.directive("ngEnter",function(){return function(a,b,c){b.bind("keydown keypress",function(b){13===b.which&&(a.$apply(function(){a.$eval(c.ngEnter)}),b.preventDefault())})}}),angular.module("atlantisWebAppApp").controller("PlantesCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("atlantisWebAppApp").controller("LightOptionsCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),nApp.controller("RoomCtrl",["$scope","$rootScope","$http","$filter","$sessionStorage","$mdDialog","AtlantisUri",function(a,b,c,d,e,f,g){a.rooms=e.rooms,a.addRoom=function(b){var f=g.Rooms()+"?api="+e.api+"&label="+b;c.post(f).success(function(b,c){202==c&&(a.rooms.push(b),a.rooms=d("orderBy")(a.rooms,"room"),a.item=null)})},a.delRoom=function(b){var d=g.Rooms()+"?api="+e.api+"&id="+b.id;c["delete"](d).success(function(c,d){if(202==d){var e=a.rooms.indexOf(b);a.rooms.splice(e,1)}})},a.cancel=function(){e.rooms=a.rooms,f.cancel()}}]),nApp.controller("CuisineAddCtrl",["$scope","$http","$filter","$localStorage","$sessionStorage","$mdDialog","$mdToast","AtlantisUri",function(a,b,c,d,e,f,g,h){function i(){var c=h.Ean()+"?api="+e.api;b.get(c).success(function(b,c){d.ean=b,a.items=d.ean})}a.places=[{id:"placard",label:"Placard"},{id:"congelateur",label:"Congélateur"},{id:"frigidaire",label:"Frigidaire"}],null==d.ean||""==d.ean?i():a.items=d.ean,a.filterList=function(a){var b=d.ean,e=[];return angular.forEach(b,function(b){(c("lowercase")(b.ean).indexOf(c("lowercase")(a))>-1||c("lowercase")(b.nom).indexOf(c("lowercase")(a))>-1)&&e.push(b)}),e},a.itemChange=function(){a.codebarre=null},a.itemSelect=function(){null!=a.selectedItem.ean&&(a.codebarre=a.selectedItem.ean)},a.submit=function(){if(null==a.searchText||""==a.searchText||null==a.date||""==a.date)return void showToast(g,"Merci de remplir le nom et la date de péremption du produit !");var d=h.Cuisine()+"?api="+e.api;null==a.selectedItem.ean?(d+="&element="+a.searchText,null!=a.codebarre&&""!=a.codebarre&&(d+="&ean="+a.codebarre)):d+="&element="+a.selectedItem.ean,d+="&peremption="+c("date")(a.date,"yyyy-MM-dd")+"&endroit="+a.place.id+"&quantite="+a.quantity,b.post(d).success(function(a,b){202==b&&f.hide(a)})},a.cancel=function(){f.cancel()}}]),nApp.controller("PharmacieAddCtrl",["$scope","$http","$sessionStorage","$filter","$mdDialog","$mdToast","AtlantisUri",function(a,b,c,d,e,f,g){a.submit=function(){if(null==a.name||""==a.name||null==a.date||""==a.date)return void showToast(f,"Merci de remplir le nom et la date de péremption du médicament !");var h=g.Pharmacie()+"?api="+c.api;h+="&nom="+a.name+"&peremption="+d("date")(a.date,"yyyy-MM-dd"),null!=a.quantity&&a.quantity>1&&(h+="&qte="+a.quantity),b.post(h).success(function(a,b){202==b&&e.hide(a)})},a.cancel=function(){e.cancel()}}]),nApp.controller("EntretienAddCtrl",["$scope","$http","$sessionStorage","$filter","$mdDialog","$mdToast","AtlantisUri",function(a,b,c,d,e,f,g){a.submit=function(){if(null==a.name||""==a.name||null==a.date||""==a.date)return void showToast(f,"Merci de remplir le nom et la date de péremption du produit !");var h=g.Entretien()+"?api="+c.api;h+="&nom="+a.name+"&peremption="+d("date")(a.date,"yyyy-MM-dd"),null!=a.quantity&&a.quantity>1&&(h+="&qte="+a.quantity),b.post(h).success(function(a,b){202==b&&e.hide(a)})},a.cancel=function(){e.cancel()}}]),nApp.controller("DevicesAddCtrl",["$scope","$http","$sessionStorage","$mdDialog","$mdToast","AtlantisUri","users","device",function(a,b,c,d,e,f,g,h){a.types=[{id:"windows",label:"Microsoft Windows"},{id:"smartphone",label:"Smartphone"},{id:"linux",label:"Linux"},{id:"imprimante",label:"Imprimante"},{id:"autre",label:"Autre"}],a.connections=[{id:"wifi",label:"Wifi"},{id:"ethernet",label:"Ethernet"}],a.users=g,null!=h?(a.btnSubmit="Modifier",a.name=h.nom,a.ip=h.ip,a.mac=h.mac,a.type={id:h.type},a.connection={id:h.connexion},a.user={id:h.username}):a.btnSubmit="Ajouter",a.submit=function(){if(null==a.name||null==a.ip||null==a.mac||null==a.type||null==a.connection)return void showToast(e,"Merci de remplir les détails de l'appareil !");var g=f.Devices()+"?api="+c.api;g+="&title="+a.name+"&ip="+a.ip+"&mac="+a.mac+"&type="+a.type.id+"&connection="+a.connection.id,null!=a.user&&""!=a.user.id&&(g+="&user="+a.user.id),null==h?b.post(g).success(function(a,b){202==b&&d.hide(a)}):(g+="&id="+h.id,b.put(g).success(function(b,c){if(202==c){var e={nom:a.name,ip:a.ip,mac:angular.uppercase(a.mac),type:a.type.id,connexion:a.connection.id,username:a.user.id};d.hide(e)}}))},a.cancel=function(){d.cancel()}}]),nApp.controller("HomePlanCtrl",["$scope","$sessionStorage","$mdDialog","$mdToast","Upload","$timeout","AtlantisUri",function(a,b,c,d,e,f,g){a.$watch("files",function(){if(a.files&&a.files.length){var f=g.Rooms();e.upload({url:f,fields:{api:b.api},file:a.files}).progress(function(a){parseInt(100*a.loaded/a.total)}).success(function(a,b,e,f){202==b?(showToast(d,"Plan envoyé avec succès !"),c.hide()):showToast(d,b,a)})}}),a.cancel=function(){c.cancel()}}]);