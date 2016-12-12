angular
        .module('app.meetingStatus', [])
        .controller('meetingStatusCtrl', function ($scope, $rootScope, $state){
              $scope.detailNav = function () {
   
                 $state.go("page.detail");
              };
})