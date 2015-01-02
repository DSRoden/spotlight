(function(){
  'use strict';

  angular.module('hapi-auth')
  .controller('DaysListCtrl', ['$rootScope', '$scope', '$state', 'Day', function($rootScope, $scope, $state, Day){
    $scope.dayDetail = {};
    $scope.days = [];
    Day.getDays().then(function(response){
      $scope.days = response.data;
      console.log('response from getting all days', response);
    });

    $scope.showDay = function(id){
      Day.showDay(id).then(function(response){
        console.log('response from showDay', response);
        $scope.dayDetail = response.data;
        $scope.day = true;
      });
    };

  }]);
})();
