 /*jshint camelcase: false */
(function(){
  'use strict';

  angular.module('spotlight-famous')
  .controller('AccountCtrl', ['$scope', '$timeout', '$location', '$famous', '$timeline', '$state', 'ngDialog', function($scope , $timeout, $location, $famous, $timeline, $state, ngDialog){
    var marginTop = function(){
        var  height = window.innerHeight;
        if(height === 480){
          $scope.margin = 15;
        } else if(height === 568){
          $scope.margin = 25;
        } else if(height === 667){
          $scope.margin = 35;
        } else if(height === 736){
          $scope.margin = 45;
        } else {
          console.log('unrecognized size');
        }
      };
      marginTop();

    $scope.closeDialog = function(){
      ngDialog.close('', '');
    };

    $scope.closeUserAccount = function(){
      $scope.closeDialog();
    };
  }]);
})();
