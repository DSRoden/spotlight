(function(){
  'use strict';

  angular.module('hapi-auth')
  .factory('Day', ['$http', function($http){

    function getDays(){
      console.log('getting all days');
      return $http.get('/days');
    }

    function showDay(id){
      console.log('getting specific day with id', id);
      return $http.post('/day', {dayId : id});
    }

    return {getDays: getDays, showDay: showDay};
  }]);
})();
