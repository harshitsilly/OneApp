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

.controller('detailCtrl', function ($scope, $rootScope, $state, $ionicActionSheet, $http, $ionicPopup) {
  $scope.buildings = [{
    "id": 1,
    "name": "SSZ"
  }, {
    "id": 2,
    "name": "Whitefield"
  }];
  $scope.memberList = $rootScope.memberList;
  $scope.detailTitle = $rootScope.meetingDetail[0].description;

   $scope.selected = {
      value: ''
    };
    
  if(!$rootScope.IsMeetingClick){
    $scope.createMeeting = {
      subject: '',
      description: '',
      startTimeRange: '',
      endTimeRange: '',
      duration: '',
      meetingDate: ''
    };
    $scope.IsNoMeetingClick = true;
   
  } else {
   //$scope.rooms = $rootScope.rooms; 
   $scope.createMeeting = $rootScope.createMeeting;
    $scope.IsNoMeetingClick = false;
  }

  $scope.deleteMeeting = function () {
    var hideSheet = $ionicActionSheet.show({
      destructiveText: 'Confirm',
      cancelText: 'Cancel',
      destructiveButtonClicked: function () {
        // add delete code..
      }
    });

  }
  

  $scope.createMyMeeting = function () {  
//  $rootScope.show();
     var sRoom = $scope.createMeeting.selectedfloor;
      var sBuilding = $scope.createMeeting.selectedbuilding;
      var sSub = $scope.createMeeting.subject;
      var sDescription = $scope.createMeeting.description;
      var fDuration = $scope.createMeeting.duration;

      var meetingOn = $scope.createMeeting.meetingDate;
      

    var tStartTime = $scope.createMeeting.startTimeRange;
    var tEndTime = $scope.createMeeting.endTimeRange;
    //var iCanCreate = 0;
    var meetDate = meetingOn.toLocaleString().split(',');
    tStartTime = tStartTime.toLocaleString().split(',');
    tEndTime = tEndTime.toLocaleString().split(',');
    tStartTime[0] = meetDate[0];
    tEndTime[0] = meetDate[0];
    tStartTime = new Date(tStartTime[0] + ',' + tStartTime[1]);
    tEndTime = new Date(tEndTime[0] + ',' + tEndTime[1]);

     $http({
      method: 'GET',
      url: $rootScope.baseURL + '/api/x?start=' + tStartTime.toLocaleTimeString() + '&end=' + tEndTime.toLocaleTimeString() ,
      
    }).then(function successCallback(response) {
      console.log(response);
      if(response.data < 1){
       
        var aMembers = [];
        var aMemberHash = {};
        aMembers.push("I321584");
        aMemberHash["I321584"] = 1;
        for (i = 0; i < $scope.selected.value.length; i++) {
          if(!aMemberHash[$scope.selected.value[i].id]){
            aMembers.push($scope.selected.value[i].id);
            aMemberHash[$scope.selected.value[i].id] = 1;
          }
        }

      
      

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
          // $rootScope.hide();
          $state.go('newMeeting');
          //$state.go('meetingStatus');
        }, function errorCallback(response) {
        
          console.log("ERROR");
        });
      
        }
        else{
  //        $ionicPopup.alert({
  //    title: 'oops!',
  //    template: 'Meetings already exist in timeframe'
  //  });
          alert("Meetings already exist in timeframe.");

        }

    }, function errorCallback(response) {
      console.log("ERROR");
     
    });
    

   
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


  .controller('meetingCtrl', function ($scope, $rootScope, $state, $http) {

   var onSuccess = function (position) {
    alert('Latitude: ' + position.coords.latitude + '\n' +
      'Longitude: ' + position.coords.longitude + '\n' );
  };

  function onError(error) {
    alert('code: ' + error.code + '\n' +
      'message: ' + error.message + '\n');
  }
  $scope.memberList = $rootScope.memberList;

   
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
  
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

    $http({
      method: 'GET',
      url: $rootScope.baseURL + '/api/meeting?id=I321584'
    }).then(function successCallback(response) {
          if(response && response.data){
            $scope.items = response.data.mymeetings;
          }
        }, function errorCallback(response) {
          console.log("ERROR");
        });
    

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
      $rootScope.IsMeetingClick = false;
      $state.go("page.detail");

    };

    $scope.detailNav = function () {
      $rootScope.edit = true;
      $rootScope.IsMeetingClick = true;
      $rootScope.meetingDetail = [{
        description: this.item.subject,
        meetingId: "",
        editable: true
      }];
      var sStTime = this.item.starttime.toString();
      var sEnTime = this.item.endtime.toString();
      var sStartDate = new Date(this.item.proposedDate);
      sStartDate.setHours(sStTime.substr(0, 2));
      sStartDate.setMinutes(sStTime.substr(2, 4));


      var sEndDate = new Date(this.item.proposedDate);
      sEndDate.setHours(sEnTime.substr(0, 2));
      sEndDate.setMinutes(sEnTime.substr(2, 4));

      var sMembers = this.item.members.split(",");
      var oMembers = [];
      for(var i = 0; i < sMembers.length; ++i){
        oMembers.push($rootScope.memberHash[sMembers[i]]);
      }

      $rootScope.buildings = { selectedbuilding: this.item.building_name};
      $rootScope.rooms = { selectedfloor: this.item.desired_room};
      $rootScope.createMeeting = { 
        selectedbuilding : this.item.building_name,
        subject: this.item.subject,
        selectedfloor: this.item.desired_floor + '-' + this.item.desired_room,
       description: this.item.description,
       startTimeRange : sStartDate,
       endTimeRange : sEndDate,
       meetingDate : new Date(this.item.proposedDate),
       duration : this.item.duration,
       members : oMembers
      };
      $state.go("page.detail");
    };
  })
