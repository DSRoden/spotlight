(function(){
  'use strict';

  angular.module('hapi-auth')
    .factory('User', ['$http', function($http){

      function register(user){
      //console.log('user object', user);
        return $http.post('/register', user);
      }

      function login(user){
        return $http.post('/login', user);
      }

      function logout(){
        return $http.delete('/logout');
      }

      function runLottery(){
        //console.log('getting users, in factory');
        return $http.get('/users');
      }

      function selectWinner(id){
        //console.log('sending winner id for selecting spotlight', id);
        return $http.post('/winner', {id: id});
      }

      function notifyWinner(id){
        return $http.post('/notify', {id: id});
      }

      function isSpotlightOn(){
        return $http.get('/spotlightcheck');
      }

      return {register:register, login:login, logout:logout, runLottery: runLottery, selectWinner: selectWinner, notifyWinner: notifyWinner, isSpotlightOn: isSpotlightOn};
    }]);
})();
