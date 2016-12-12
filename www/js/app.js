// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.newMeetingRequest', 'app.meetingStatus', 'app.routes', 'app.services', 'app.directives', 'ui.select', 'ngSanitize'])

.run(function ($ionicPlatform, $rootScope, $ionicLoading, $timeout, $http) {
  $rootScope.baseURL = window.location.origin;
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });


  var fetchMembers = function(){
      $http({
        method: 'GET',
        url: $rootScope.baseURL + '/api/member'
      }).then(function successCallback(response) {
       
        $rootScope.memberList = response.data;
        $rootScope.memberHash = {};
        for(var i = 0; i < response.data.length; ++i){
            $rootScope.memberHash[response.data[i].id] = response.data[i];
        }
        
      }, function errorCallback(response) {
        console.log("ERROR");
      });
      $timeout(fetchMembers, 20000);
  }
  $timeout(fetchMembers, 20000);
  // var fetchLocation = function () {
  //   var onSuccess = function (position) {
  //     $http({
  //       method: 'PUT',
  //       url: $rootScope.baseURL + '/api/location',
  //       params: {
  //         "id": "I321530",
  //         "lat": position.coords.latitude,
  //         "long": position.coords.longitude
  //       }
  //     }).then(function successCallback(response) {
  //       console.log('Latitude: ' + position.coords.latitude + '\n' +
  //         'Longitude: ' + position.coords.longitude + '\n');
  //     }, function errorCallback(response) {
  //       console.log("ERROR")
  //     });
      
  //   };

  //   function onError(error) {
  //     console.log('code: ' + error.code + '\n' +
  //       'message: ' + error.message + '\n');
  //   }
  //   navigator.geolocation.getCurrentPosition(onSuccess, onError);
  //   $timeout(fetchLocation, 20000);
  // }

  // $timeout(fetchLocation, 20000);
})
