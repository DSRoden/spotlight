(function(){
  'use strict';

  angular.module('hapi-auth')
  .factory('Message', ['$http', function($http){

    function getAll(){
      console.log('getting all messages');
      return $http.get('/messages');
    }

    return {getAll: getAll};
  }]);
})();
