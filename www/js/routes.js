angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('page', {
    url: '/page1',
    templateUrl: 'templates/page.html',
    controller: 'pageCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

.state('page.meeting', {
    url: '/meeting',
     views: {
        'meetingPage': {
            templateUrl: 'templates/meeting.html',
    controller: 'meetingCtrl'
        }
      }
    
  
  })
  .state('page.detail', {
    url: '/detail',
     views: {
        'meetingPage': {
            templateUrl: 'templates/detail.html',
    controller: 'detailCtrl'
        }
      }
    
  
  })


 

  

$urlRouterProvider.otherwise('/login')

  

});