 /*jshint camelcase: false */
(function(){
  'use strict';

  angular.module('spotlight-famous')
  .controller('OnboardingCtrl', ['$scope', '$timeout', '$location', '$famous', '$timeline', '$state', 'ngDialog', function($scope , $timeout, $location, $famous, $timeline, $state, ngDialog){
    //animations and eventhandler inits
    var Transitionable = $famous['famous/transitions/Transitionable'],
        // Easing = $famous['famous/transitions/Easing'],
        EventHandler = $famous['famous/core/EventHandler'];

    $scope.onboardingOpacity = new Transitionable(0);
    $scope.tipsHandler = new EventHandler();
    $scope.spotlightTips = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    $scope.options = {
      tipsContainer: {
        clipSize: 300
      }
    };

    $scope.enter = function($done){
      console.log('entering onboarding');
      $scope.onboardingOpacity.set([1], {duration: 250}, $done);
    };

    $scope.leave = function($done){
      console.log('leaving onboarding');
      $scope.onboardingOpacity.set([0], {duration: 250}, $done);
    };

    $scope.photoTransparency = new Transitionable(1);
    $scope.bioTransparency = new Transitionable(0);
    $scope.socialTransparency = new Transitionable(0);
    $scope.tipsTransparency = new Transitionable(0);

    $scope.onboardingCurrentProcess = 'photo';
    $scope.onboardingNextProcess = 'bio';
    $scope.onboardingPhoto = true;
    $scope.onboardingBio = false;
    $scope.onboardingSocial = false;
    $scope.onboardingTips = false;
    $scope.showOnboardingProcess = function(next){
      console.log('processing next', next);
      switch(next){
        case 'bio':
          $scope.onboardingPhoto = false;
          $scope.onboardingBio = true;
          $scope.onboardingCurrentProcess = 'bio';
          $scope.onboardingNextProcess = 'social';
          $scope.photoTransparency.set([0], {duration: 300});
          $scope.bioTransparency.set([1], {duration: 300});
          break;
        case 'social':
          $scope.onboardingBio = false;
          $scope.onboardingSocial = true;
          $scope.onboardingCurrentProcess = 'social';
          $scope.onboardingNextProcess = 'tips';
          $scope.bioTransparency.set([0], {duration: 300});
          $scope.socialTransparency.set([1], {duration: 300});
          break;
        case 'tips':
          $scope.onboardingSocial= false;
          $scope.onboardingTips= true;
          $scope.onboardingCurrentProcess = 'tips';
          $scope.socialTransparency.set([0], {duration: 300});
          $scope.tipsTransparency.set([1], {duration: 300});
          break;
      }
    };

    $scope.backOnboardingProcess = function(current){
      console.log('current', current);
      switch(current){
        case 'bio':
          $scope.onboardingBio = false;
          $scope.onboardingPhoto = true;
          $scope.onboardingCurrentProcess = 'photo';
          $scope.onboardingNextProcess = 'bio';
          $scope.photoTransparency.set([1], {duration: 300});
          $scope.bioTransparency.set([0], {duration: 300});
          break;
        case 'social':
          $scope.onboardingSocial = false;
          $scope.onboardingBio = true;
          $scope.onboardingCurrentProcess = 'bio';
          $scope.onboardingNextProcess = 'social';
          $scope.bioTransparency.set([1], {duration: 300});
          $scope.socialTransparency.set([0], {duration: 300});
          break;
        case 'tips':
          $scope.onboardingTips = false;
          $scope.onboardingSocial = true;
          $scope.onboardingCurrentProcess = 'social';
          $scope.onboardingNextProcess = 'tips';
          $scope.tipsTransparency.set([0], {duration: 300});
          $scope.socialTransparency.set([1], {duration: 300});
          break;
      }
    };

   $scope.title = 'onboarding winner';
   $scope.getPageWidth = function(){
      return window.innerWidth;
    };
    $scope.getPageHeight = function(){
      return window.innerHeight;
    };

    //initiating size depenedencies2
    $scope.spotlightWinnerMarginTop = 0;
    $scope.spotlightWinnerCardHeight = 0;
    $scope.spotlightWinnerBackArrow = 0;
    $scope.backArrowOnboardingView = 0;
    $scope.gridMarginLeft = 0;
    $scope.gridMarginTop = 0;
    $scope.onboardingCardHeight = 0;
    $scope.cameraLeftMargin = 0;
    $scope.albumsRightMargin = 0;
    $scope.flipBackMarginLeft = window.innerWidth/2 - 20;
    $scope.photoInfoContainerMarginTop = 0;
    $scope.tipsScrollMarginTop = 0;
    function sizeDependencies2(){
     var  height = window.innerHeight;
        if(height === 480){
          $scope.spotlightWinnerCardHeight = 385;
          $scope.spotlightWinnerMarginTop = -5;
          $scope.spotlightWinnerBackArrow = -15;
          $scope.backArrowOnboardingView = 350;
          $scope.gridMarginLeft = 25;
          $scope.gridMarginTop = -30;
          $scope.onboardingCardHeight = 470;
          $scope.cameraLeftMargin = -40;
          $scope.albumRightMargin = 30;
          $scope.photoInfoContainerMarginTop = 5;
          $scope.tipsScrollMarginTop = 50;

        } else if(height === 568){
           $scope.spotlightWinnerCardHeight = 460;
          $scope.spotlightWinnerMarginTop = 25;
          $scope.spotlightWinnerBackArrow = 30;
          $scope.backArrowOnboardingView = 400;
          $scope.gridMarginLeft = 25;
          $scope.gridMarginTop = -20;
          $scope.onboardingCardHeight = 560;
          $scope.cameraLeftMargin = -40;
          $scope.albumRightMargin = 30;
          $scope.photoInfoContainerMarginTop = 15;
          $scope.tipsScrollMarginTop = 70;

        } else if(height === 667){
           $scope.spotlightWinnerCardHeight = 560;
          $scope.spotlightWinnerMarginTop = 45;
          $scope.spotlightWinnerBackArrow = 120;
          $scope.backArrowOnboardingView = 450;
          $scope.gridMarginLeft = 30;
          $scope.gridMarginTop = -10;
          $scope.onboardingCardHeight = 655;
          $scope.cameraLeftMargin = -27;
          $scope.albumRightMargin = 30;
          $scope.photoInfoContainerMarginTop = 50;
          $scope.tipsScrollMarginTop = 100;

        } else if(height === 736){
          $scope.spotlightWinnerCardHeight = 640;
          $scope.spotlightWinnerMarginTop = 65;
          $scope.spotlightWinnerBackArrow = 200;
          $scope.backArrowOnboardingView = 500;
          $scope.gridMarginLeft = 30;
          $scope.gridMarginTop = -10;
          $scope.onboardingCardHeight = 725;
          $scope.cameraLeftMargin = -23;
          $scope.albumRightMargin = 30;
          $scope.photoInfoContainerMarginTop = 100;
          $scope.tipsScrollMarginTop = 150;
        } else {
          console.log('unrecognized size');
        }
      }

      sizeDependencies2();

      //assets
      $scope.winnerAvatarDefault = 'img/person-icon-yellow.png';

      //set onboarding process
      $scope.onboardingCurrentProcess = 'photo';
      $scope.confirmSpotlightAndSwitchStates = function(){
        $state.go('home');
      };


  }]);
})();
