angular.module('app.controllers', [])

.controller('pageCtrl', function ($scope) {

})

.controller('signupCtrl', function ($scope) {

})

.controller('loginCtrl', function ($scope, $window) {
  $scope.createUser = function () {
    $window.location.href = ('#/signup');
  }
  $scope.validateUser = function () {
    $window.location.href = ('#/page1/meeting');
  }

})

.controller('detailCtrl', function ($scope, $rootScope, $ionicActionSheet, $http) {
  $scope.buildings = [{
    "id": 1,
    "name": "SSZ"
  },
  {
    "id": 2,
    "name": "Whitefield"
  }];
  $scope.detailTitle = $rootScope.meetingDetail[0].description;
  $scope.deleteMeeting = function () {
      var hideSheet = $ionicActionSheet.show({
        destructiveText: 'Confirm',
        cancelText: 'Cancel',
        destructiveButtonClicked : function () {
          // add delete code..
        }
      });
     
  }
  $http({
    method: 'GET',
    url: $rootScope.baseURL + '/api/member'
  }).then(function successCallback(response) {
      $scope.memberList = response.data;
    }, function errorCallback(response) {
      console.log("ERROR");
    });

  $scope.selected = { value: $scope.memberList };
  
   $scope.createMyMeeting = function() {
     console.log($scope.selected.value+ $scope.building.name + $scope.building_room );
   };

   $scope.onBuildingSelect = function(buildings){
     $http({
        method: 'GET',
        url: $rootScope.baseURL + '/api/room?Building=' + buildings
      }).then(function successCallback(response) {
          $scope.rooms = response.data;
        }, function errorCallback(response) {
          console.log("ERROR");
        });
      };

})

.controller('meetingCtrl', function ($scope, $rootScope, $state) {

  $scope.items = [{
    "description": "Deserunt cupidatat officia.",
    "organizerName": {
      "first": "Watson",
      "last": "George"
    },
    "buildingName": "Dennett Place",
    "status": "ACCEPTED",
    "isRepeating": false
  }, {
    "description": "Sint id aliqua ullamco Lorem sit .",
    "organizerName": {
      "first": "Stacie",
      "last": "Dillon"
    },
    "buildingName": "Anchorage Place",
    "status": "DECLINED",
    "isRepeating": false
  }, {
    "description": "Ea nostrud Lorem anim ut veniam .",
    "organizerName": {
      "first": "Morrow",
      "last": "Singleton"
    },
    "buildingName": "Crooke Avenue",
    "status": "CANCELLED",
    "isRepeating": true
  }, {
    "description": "Ad labore eu quis culpa .",
    "organizerName": {
      "first": "Johnston",
      "last": "Holloway"
    },
    "buildingName": "Gunnison Court",
    "status": "TO BE DECIDED",
    "isRepeating": true
  }, {
    "description": "In ea cillum commodo uis ea.",
    "organizerName": {
      "first": "Benjamin",
      "last": "Carrillo"
    },
    "buildingName": "Sullivan Place",
    "status": "ACCEPTED",
    "isRepeating": true
  }];
  $scope.decision = true;
  $scope.chkDecision = function(){
    if(this.item.status === "TO BE DECIDED"){
      return true;
    }else{
      return false;
    }
  }
  
  $scope.createMeeting = function () {
    $rootScope.edit = false;
    $rootScope.meetingDetail = [{
      description: "New Meeting",
      meetingId: "",
      editable: false
    }];
    $state.go("page.detail");

  };

  $scope.detailNav = function () {
    $rootScope.edit = true;
    $rootScope.meetingDetail = [{
      description: this.item.description,
      meetingId: "",
      editable: true
    }];
    $state.go("page.detail");
  };
})