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

.controller('detailCtrl', function ($scope, $rootScope, $state, $ionicActionSheet, $http) {
  $scope.buildings = [{
    "id": 1,
    "name": "SSZ"
  }, {
    "id": 2,
    "name": "Whitefield"
  }];
  $scope.detailTitle = $rootScope.meetingDetail[0].description;
  $scope.createMeeting = {
    subject: '',
    description: '',
    startTimeRange: '',
    endTimeRange: '',
    duration: '',
    meetingDate: ''
  };
  $scope.selected = {
    value: ''
  };
  $scope.deleteMeeting = function () {
    var hideSheet = $ionicActionSheet.show({
      destructiveText: 'Confirm',
      cancelText: 'Cancel',
      destructiveButtonClicked: function () {
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



  $scope.createMyMeeting = function () {
    var aMembers = [];
    for (i = 0; i < $scope.selected.value.length; i++) {
      aMembers.push($scope.selected.value[i].id);
    }
    var sRoom = $scope.rooms.selectedfloor;
    var sBuilding = $scope.buildings.selectedbuilding;
    var sSub = $scope.createMeeting.subject;
    var sDescription = $scope.createMeeting.description;
    var fDuration = $scope.createMeeting.duration;

    var tStartTime = $scope.createMeeting.startTimeRange;
    var tEndTime = $scope.createMeeting.endTimeRange;
    var meetingOn = $scope.createMeeting.meetingDate;
    
    var meetDate = meetingOn.toLocaleString().split(',');
    tStartTime = tStartTime.toLocaleString().split(',');
    tEndTime = tEndTime.toLocaleString().split(',');
    tStartTime[0] = meetDate[0];
    tEndTime[0] = meetDate[0];
    tStartTime = new Date(tStartTime[0] + ',' + tStartTime[1]);
    tEndTime = new Date(tEndTime[0] + ',' + tEndTime[1]);

    var oPayload = {
      "building_name" : sBuilding,
      "members" : aMembers,
      "subject" : sSub,
      "description" : sDescription,
      "organizer_id" : "I321584",
      "date" : new Date(),
      "starttime" : tStartTime,
      "endtime" : tEndTime,
      "desired_floor" : sRoom.split('-')[0],
      "desired_room" : sRoom.split('-')[1] 
    };
    $http({
      method: 'POST',
      url: $rootScope.baseURL + '/api/meeting',
      data: oPayload
    }).then(function successCallback(response) {
      console.log("SUCCESS");
    }, function errorCallback(response) {
      console.log("ERROR");
    });
    $state.go('newMeeting');
    //$state.go('meetingStatus');
  };

  $scope.onBuildingSelect = function (buildings) {
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
    $scope.chkDecision = function () {
      if (this.item.status === "TO BE DECIDED") {
        return true;
      } else {
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
