(function(){
  'use strict';

  angular.module('hapi-auth')
  .factory('Message', ['$http', function($http){

    function getAll(){
      console.log('getting all messages');
      return $http.get('/messages');
    }

    function getAllAuthenticated(){
      return $http.get('/messages/authenticated');
    }


    function like(updateId){
      console.log('the id of the update being liked', updateId);
      return $http.post('/messages/like', {updateId: updateId});
    }

    return {getAll: getAll, getAllAuthenticated: getAllAuthenticated, like: like};
  }]);
})();
