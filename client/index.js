(function(){
  'use strict';

  angular.module('hapi-auth', ['ui.router', 'angularFileUpload'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('main',         {url:'/',         templateUrl:'/views/spotlight/main.html',          controller: 'MainCtrl'})
        // .state('home',         {url:'/',         templateUrl:'/views/home/home.html',          controller: 'HomeCtrl'})
        .state('register',     {url:'/register', templateUrl:'/views/users/users.html',        controller:'UsersCtrl'})
        .state('login',        {url:'/login',    templateUrl:'/views/users/users.html',        controller:'UsersCtrl'})
        .state('spotlight',    {url:'/spotlight', templateUrl:'/views/spotlight/spotlight.html',        controller:'SpotlightCtrl'})
        .state('days',         {url:'/archive',    templateUrl:'/views/days/days.html',                 abstract: true})
        .state('days.list',     {url:'',    templateUrl:'/views/days/days_list.html',    controller: 'DaysListCtrl'})
        .state('notes',        {url:'/notes',    templateUrl:'/views/notes/notes.html',        abstract:true})
        .state('notes.list',   {url:'?tag&page', templateUrl:'/views/notes/notes_list.html',   controller:'NotesListCtrl'})
        .state('notes.detail', {url:'/{noteId}', templateUrl:'/views/notes/notes_detail.html', controller:'NotesDetailCtrl'});
    }])
    .run(['$rootScope', '$http', function($rootScope, $http){
      $http.get('/status').then(function(response){
        $rootScope.rootuser = response.data;
      }, function(){
        $rootScope.rootuser = null;
      });

      window.socket = io.connect('/');
      window.socket.on('online', function(){
       $rootScope.$broadcast('online');
      });
    }]);
})();
