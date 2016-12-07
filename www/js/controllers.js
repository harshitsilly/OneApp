angular.module('app.controllers', [])
  
.controller('pageCtrl', function($scope) {

})
   
.controller('signupCtrl', function($scope) {

})
   
.controller('loginCtrl', function($scope,$window) {
    $scope.createUser = function() {
     $window.location.href = ('#/signup');
	}
	 $scope.validateUser = function() {
     $window.location.href = ('#/page1/meeting');
	}
	
})
   
.controller('detailCtrl', function($scope) {

})
   
.controller('meetingCtrl', function($scope) {

})
 