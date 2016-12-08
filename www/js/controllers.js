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

.controller('detailCtrl', function ($scope, $rootScope, $ionicActionSheet) {
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

  $scope.createMeeting = function () {
    $rootScope.meetingDetail[0].editable = false;
    $state.go("page.detail");
  };

  $scope.detailNav = function () {
    $rootScope.meetingDetail = [{
      description: this.item.description,
      meetingId: "",
      editable: true
    }];
    $state.go("page.detail");
  };
})

.controller('detailCtrl', function ($scope, $rootScope, $state) {

   $scope.building = ['', 'blr1', 'blr2', 'blr3'];
   $scope.floor = ['', 'f1', 'f2', 'f3'];
   $scope.room = ['', 'r1', 'r2', 'r3'];
   $scope.my = { selectedBuilding: '',  selectedFloor: '', selectedRoom: '', subject: '', description: '', startTimeRange: '', endTimeRange: '', dateForMeeting: '', duration: ''};
  
   $scope.createMyMeeting = function() {
      var sSelectedBuilding = $scope.my.selectedBuilding;
      var sSelectedFloor = $scope.my.selectedFloor;
      var sSelectedRoom = $scope.my.selectedRoom;
      var sSubject = $scope.my.subject;
      var sDescription = $scope.my.description;
      var tstartTimeRange = $scope.my.startTimeRange;
      var tendTimeRange = $scope.my.endTimeRange;
      var dDateForMeeting = $scope.my.dateForMeeting;
      var iduration = $scope.my.duration;

      var oPayload = {

      };

      // make call

     
   };

 
})
