(function(){
  'use strict';

  angular.module('hapi-auth')
  .factory('Photo', ['$http', function($http){

    function getAll(){
      console.log('getting all photos');
      return $http.get('/photos');
    }

    function getAllAuthenticated(){
      console.log('getting authenticated photos');
      return $http.get('/photos/authenticated');
    }

    return {getAll: getAll, getAllAuthenticated: getAllAuthenticated};
  }]);
})();
