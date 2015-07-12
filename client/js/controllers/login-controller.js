 /*jshint camelcase: false */
(function(){
  'use strict';

  angular.module('spotlight-famous')
  .controller('LoginCtrl', ['$scope', '$timeout', '$location', '$famous', '$timeline', '$state', 'ngDialog', function($scope , $timeout, $location, $famous, $timeline, $state, ngDialog){
    $scope.spotlightWinnerMarginTop = 0;
    $scope.spotlightWinnerCardHeight = 0;
    $scope.spotlightWinnerBackArrow = 0;
    $scope.accountButtonPosition = 0;
    $scope.titlePosition = 0;
    $scope.registerContainerMarginTop = 0;

    function sizeDependencies(){
     var  height = window.innerHeight;
        if(height === 480){
           $scope.spotlightWinnerCardHeight = 405;
          $scope.spotlightWinnerMarginTop = -5;
          $scope.spotlightWinnerBackArrow = -15;
          $scope.accountButtonPosition = 22;
          $scope.titlePosition = -15;
          $scope.registerContainerMarginTop = 10;
        } else if(height === 568){
           $scope.spotlightWinnerCardHeight = 490;
          $scope.spotlightWinnerMarginTop = 25;
          $scope.spotlightWinnerBackArrow = 30;
          $scope.accountButtonPosition = 24;
          $scope.titlePosition = 20;
          $scope.registerContainerMarginTop = 20;
        } else if(height === 667){
           $scope.spotlightWinnerCardHeight = 590;
          $scope.spotlightWinnerMarginTop = 45;
          $scope.spotlightWinnerBackArrow = 120;
          $scope.accountButtonPosition = 25;
          $scope.titlePosition = 100;
          $scope.registerContainerMarginTop = 20;
        } else if(height === 736){
          $scope.spotlightWinnerCardHeight = 660;
          $scope.spotlightWinnerMarginTop = 65;
          $scope.spotlightWinnerBackArrow = 200;
          $scope.accountButtonPosition = 27;
          $scope.titlePosition = 120;
          $scope.registerContainerMarginTop = 25;
        } else {
          console.log('unrecognized size');
        }
      }

    sizeDependencies();

    $scope.closeDialog = function(){
      ngDialog.close('', '');
    };

    $scope.closeLogin = function(){
      $scope.closeDialog();
    };

    //animations and eventhandler inits
    var Transitionable = $famous['famous/transitions/Transitionable'],
        Easing = $famous['famous/transitions/Easing'],
        EventHandler = $famous['famous/core/EventHandler'];

    $scope.homeOpacity = new Transitionable(0);

     $scope.enter = function($done){
      console.log('entering home');
      $scope.homeOpacity.set([1], {duration: 250}, $done);
    };

    $scope.leave = function($done){
      console.log('leaving home');
      $scope.homeOpacity.set([0], {duration: 250}, $done);
    };

    //initialize spotlight about
    $scope.spotlight = {};

    //initialize user
    $scope.user = {};
    $scope.userNotSignedIn = false;
    if($scope.userNotSignedIn){
      $scope.login = true;
    }

    $scope.login = true;

    $scope.showLogin = function(){
      $scope.register = false;
      $scope.about = false;
      $scope.login = true;
      $scope.registerTransparency.set([0], {duration: 300});
      $scope.loginTransparency.set([1], {duration: 300});
    };

    $scope.showRegister = function(){
      $scope.login = false;
      $scope.about = false;
      $scope.register = true;
      $scope.loginTransparency.set([0], {duration: 300});
      $scope.registerTransparency.set([1], {duration: 300});
    };

    $scope.showAboutOne = function(e){
      console.log('e', e);
      e.stopPropagation();
      $scope.login = false;
      $scope.register = false;
      $scope.about = true;
      $scope.loginTransparency.set([0], {duration: 300});
      $scope.registerTransparency.set([0], {duration: 300});
      $scope.aboutTransparency.set([1], {duration: 300});
    };

    $scope.closeAboutOne = function(){
      $scope.login = true;
      $scope.register = false;
      $scope.about = false;
      $scope.loginTransparency.set([1], {duration: 300});
      $scope.registerTransparency.set([0], {duration: 300});
      $scope.aboutTransparency.set([0], {duration: 300});
    };
    //initialize message
    $scope.post = {};

    //enable moment
    //$scope.moment = moment;

    //confirmation dialog
    $scope.confirmation = {};
    $scope.confirmation.text = 'end your time in the Spotlight';

    //winner avatar url
    $scope.winner = {};
    $scope.winner.avatar_url = 'http://fillmurray.com/300/400';
    $scope.winnerAvatarDefault = 'img/person-icon-yellow.png';
    $scope.winner.bio = 'This is a Spotlight text update that contains a max 160 characters. Users can: share quotes, ideas, questions, shout outs, etc. Tell your story, make it count.';

    //add Image url
    $scope.addImageUrl = 'http://fillmurray.com/300/400';
    $scope.addImageHeight = function(){
        var imageHeight;
      if(window.innerHeight < 500){
        imageHeight = window.innerHeight/4;
        return imageHeight + 'px';
      } else {
        imageHeight = window.innerHeight/3;
        return imageHeight + 'px';
      }
    };

    // textarea height
    $scope.textareaHeight = function(){
      var textareaHeight = window.innerHeight/3.5;
      return textareaHeight + 'px';
    };

    //input height
    $scope.inputHeight = function(){
      var inputHeight = window.innerHeight/13;
      return inputHeight + 'px';
    };

    $scope.bioHeight = function(){
      var bioHeight = window.innerHeight/6;
      return bioHeight + 'px';
    };

    $scope.accountContentHeight = function(){
      var accountContentHeight = window.innerHeight - 300;
      return accountContentHeight;
    };

    //checking if user is in the spotlight
    $scope.userIsInTheSpotlight = true;

    //spotlight avatar
    $scope.avatar = 'http://fillmurray.com/200/400';
    var windowWidth = window.innerWidth,
        windowInnerHeight = window.innerHeight;
      //winner info box
    $scope.boxTransitionableWinnerInfo = new Transitionable([0, windowInnerHeight, 0]);
    $scope.winnerInfoBoxSize = new Transitionable([windowWidth, windowInnerHeight]);
    $scope.winnerInfoBoxTransparency = new Transitionable(1);
      //confirmaiton box
    $scope.boxTransitionableConfirmation = new Transitionable([0, windowInnerHeight, 0]);
    $scope.confirmationBoxSize = new Transitionable([windowWidth, windowInnerHeight]);
    $scope.confirmationBoxTransparency = new Transitionable(1);
      //registration box
    $scope.boxTransitionableRegistration = new Transitionable([0, windowInnerHeight, 0]);
    $scope.registrationBoxSize = new Transitionable([windowWidth, windowInnerHeight]);
    $scope.registrationBoxTransparency = new Transitionable(1);
      //reigstration transparencies
    $scope.loginTransparency = new Transitionable(1);
    $scope.registerTransparency = new Transitionable(0);
    $scope.aboutTransparency = new Transitionable(0);
      //about one
    $scope.boxTransitionableAboutOne = new Transitionable([0, windowInnerHeight, 0]);
    $scope.aboutOneBoxSize = new Transitionable([windowWidth, windowInnerHeight]);
    $scope.aboutOneBoxTransparency = new Transitionable(1);
    $scope.loginEventHandler = new EventHandler();
      //winner chosen
    $scope.boxTransitionableWinnerChosen = new Transitionable([0, windowInnerHeight, 0]);
    $scope.winnerChosenBoxSize = new Transitionable([windowWidth, windowInnerHeight]);
    $scope.winnerChosenBoxTransparency = new Transitionable(1);

    //functions for getting the window width and height
    $scope.getPageWidth = function(){
      return window.innerWidth;
    };
    $scope.getPageHeight = function(){
      return window.innerHeight;
    };
    $scope.isThisUserTheWinner = false;
    $scope.login = function(){
      $scope.isThisUserTheWinner = true;
      if($scope.isThisUserTheWinner){
        $scope.boxTransitionableWinnerChosen.set([0, 0, 0], {duration: 300, curve: Easing.easeIn});
        $scope.winnerChosenBoxSize.set([windowWidth, windowInnerHeight], {duration: 300, curve: Easing.easeIn});
        $scope.winnerChosenBoxTransparency.set([1], {duration: 300});
      }
    };
    $scope.spotlightRejected = function(){
      $scope.closeLogin();
    };
    $scope.spotlightAccepted = function(){
      $state.go('winnerOnboarding');
      $timeout(function(){
        $scope.closeLogin();
      }, 500);
    };
  }]);
})();
