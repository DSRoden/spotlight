
(function(){
  'use strict';

  angular.module('spotlight-famous')
  .controller('CategoriesCtrl', ['$scope', '$timeout', '$location', '$famous', '$timeline', '$state', 'ngDialog', function($scope, $timeout, $location, $famous, $timeline, $state, ngDialog){
    //animations and eventhandler inits
    var Transitionable = $famous['famous/transitions/Transitionable'],
       // Easing = $famous['famous/transitions/Easing'],
        EventHandler = $famous['famous/core/EventHandler'];

    $scope.categoriesOpacity = new Transitionable(0);
    $scope.categoriesEventHandler = new EventHandler();

    $scope.enter = function($done){
      console.log('entering day');
      $scope.categoriesOpacity.set([1], {duration: 250}, $done);
    };

    $scope.leave = function($done){
      console.log('leaving day');
      $scope.categoriesOpacity.set([0], {duration: 250}, $done);
    };

    $scope.options = {
      draggable1 : {
        snapX : 1,
        xRange : [20, 200],
        projection : 'Draggable._direction.x'
      }
    };

    var draggable1;
    $scope.draggable1EventHandler = new EventHandler();
    $timeout(function(){
      draggable1 = $famous.find('#draggable1')[0].modifier;
      $scope.draggable1EventHandler = draggable1.sync;
      $scope.draggable1EventHandler.on('update', function(event){
          console.log('event', event);
        });
    }, 1000);
  }]);
})();
