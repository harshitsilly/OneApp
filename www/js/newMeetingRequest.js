angular
        .module('app.newMeetingRequest', [])
        .controller('newMeetingRequestCtrl', function ($scope, $rootScope){
              $scope.detailNav = function () {
   
                 $state.go("page.detail");
              };
})