(function(){
  'use strict';

  angular.module('hapi-auth')
  .factory('Photo', ['$http', function($http){

    function getAll(){
      console.log('getting all photos');
      return $http.get('/photos');
    }

    return {getAll: getAll};
  }]);
})();
