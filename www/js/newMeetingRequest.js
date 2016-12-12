angular
        .module('app.newMeetingRequest', [])
        .controller('newMeetingRequestCtrl', function ($scope, $rootScope, $state){
              $scope.detailNav = function () {
   
                 $state.go("page.detail");
              };
})