 /*jshint camelcase: false */
 /* global moment */
(function(){
  'use strict';

  angular.module('hapi-auth')
  .controller('MainCtrl', ['$scope', '$timeout', '$location', '$famous', '$timeline', '$state', '$controller', function($scope, $timeout, $location, $famous, $timeline, $state, $controller){
	$scope.spotlightTips = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    //check user signed in or not
    $scope.userSignedIn = false;
    $scope.userNeedsToLogin = true;


    //initiating size depenedents
    $scope.spotlightWinnerMarginTop = 0;
    $scope.spotlightWinnerCardHeight = 0;
    $scope.spotlightWinnerBackArrow = 0;
    $scope.downArrowOnInfoView = 0;
    $scope.gridMarginLeft = 0;
    $scope.gridMarginTop = 0;
    $scope.informationCardHeight = 0;
    $scope.cameraLeftMargin = 0;
    $scope.albumsRightMargin = 0;
    $scope.flipBackMarginLeft = window.innerWidth/2 - 20;
    $scope.photoInfoContainerMarginTop = 0;
    $scope.confirmationButtonPositon = 0;
    $scope.confirmationCardHeight = 0;
    function sizeDependencies(){
     var  height = window.innerHeight;
        if(height === 480){
          $scope.spotlightWinnerCardHeight = 385;
          $scope.spotlightWinnerMarginTop = -5;
          $scope.spotlightWinnerBackArrow = -25;
          $scope.downArrowOnInfoView = 350;
          $scope.gridMarginLeft = 25;
          $scope.gridMarginTop = -30;
          $scope.informationCardHeight = 410;
          $scope.cameraLeftMargin = -40;
          $scope.albumRightMargin = 30;
          $scope.photoInfoContainerMarginTop = 5;
          $scope.confirmationButtonPosition = 21;
          $scope.confirmationCardHeight = 470;
        } else if(height === 568){
           $scope.spotlightWinnerCardHeight = 460;
          $scope.spotlightWinnerMarginTop = 25;
          $scope.spotlightWinnerBackArrow = 30;
          $scope.downArrowOnInfoView = 400;
          $scope.gridMarginLeft = 25;
          $scope.gridMarginTop = -20;
          $scope.informationCardHeight = 490;
          $scope.cameraLeftMargin = -40;
          $scope.albumRightMargin = 30;
          $scope.photoInfoContainerMarginTop = 15;
          $scope.confirmationButtonPosition = 23;
          $scope.confirmationCardHeight = 560;
        } else if(height === 667){
           $scope.spotlightWinnerCardHeight = 560;
          $scope.spotlightWinnerMarginTop = 45;
          $scope.spotlightWinnerBackArrow = 120;
          $scope.downArrowOnInfoView = 450;
          $scope.gridMarginLeft = 30;
          $scope.gridMarginTop = -10;
          $scope.informationCardHeight = 590;
          $scope.cameraLeftMargin = -27;
          $scope.albumRightMargin = 30;
          $scope.photoInfoContainerMarginTop = 50;
          $scope.confirmationButtonPosition = 24;
          $scope.confirmationCardHeight = 655;
        } else if(height === 736){
          $scope.spotlightWinnerCardHeight = 640;
          $scope.spotlightWinnerMarginTop = 65;
          $scope.spotlightWinnerBackArrow = 200;
          $scope.downArrowOnInfoView = 500;
          $scope.gridMarginLeft = 30;
          $scope.gridMarginTop = -10;
          $scope.informationCardHeight = 650;
          $scope.cameraLeftMargin = -23;
          $scope.albumRightMargin = 30;
          $scope.photoInfoContainerMarginTop = 100;
          $scope.confirmationButtonPosition = 26;
          $scope.confirmationCardHeight = 725;
        } else {
          console.log('unrecognized size');
          $scope.spotlightWinnerCardHeight = 640;
          $scope.spotlightWinnerMarginTop = 65;
          $scope.spotlightWinnerBackArrow = 200;
          $scope.downArrowOnInfoView = 500;
          $scope.gridMarginLeft = 30;
          $scope.gridMarginTop = -10;
          $scope.informationCardHeight = 650;
          $scope.cameraLeftMargin = -23;
          $scope.albumRightMargin = 30;
          $scope.photoInfoContainerMarginTop = 100;
          $scope.confirmationButtonPosition = 26;
          $scope.confirmationCardHeight = 725;
        }
      }

    sizeDependencies();

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

    //go to archive
    $scope.goToArchive = function(){
      console.log('switching states to archive');
      $state.go('archive');
    };

    $scope.archiveIndex = 1;
    $scope.spotlightIndex = 0;

    //initialize spotlight about
    $scope.spotlight = {};

    //initialize user
    $scope.user = {};
    $scope.userNotSignedIn = false;
    if($scope.userNotSignedIn){
      $scope.login = true;
    }

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
    $scope.moment = moment;

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


    //transitionables
      //spotlight transitionables
    $scope.boxTransitionableHeader = new Transitionable([0, 0, 0]);
    $scope.boxTransitionableFooter = new Transitionable([0, 0, 0]);
    $scope.opacityTrans = new Transitionable(1);
      //archive transitionables
    $scope.boxTransitionableHeader2 = new Transitionable([0, 0, 0]);
    $scope.boxTransitionableFooter2 = new Transitionable([0, 0, 0]);
    $scope.opacityTrans2 = new Transitionable(1);
      //show day transitionables
    $scope.boxTransitionableHeader3 = new Transitionable([0, 0, 0]);
    $scope.boxTransitionableFooter3 = new Transitionable([0, 0, 0]);
    $scope.opacityTrans3 = new Transitionable(1);
      //spotlight post box
    var windowInnerHeight = window.innerHeight,
    // windowMiddleWidth = window.innerWidth/2,
    // negativeWindowWidth = -window.innerWidth,
    windowWidth = window.innerWidth;
    $scope.boxTransitionableSpotlightPost = new Transitionable([0, windowInnerHeight, 0]);
    $scope.postboxSize = new Transitionable([windowWidth,windowInnerHeight]);
    $scope.postboxTransparency = new Transitionable(1);
      //spotlight account box
    $scope.boxTransitionableSpotlightAccount = new Transitionable([0, windowInnerHeight, 0]);
    $scope.accountBoxSize = new Transitionable([windowWidth, windowInnerHeight]);
    $scope.accountBoxTransparency = new Transitionable(1);
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
       //user account
    $scope.boxTransitionableUserAccount = new Transitionable([(window.innerWidth * 2), windowInnerHeight, 0]);
    $scope.userAccountBoxSize = new Transitionable([windowWidth, windowInnerHeight]);
    $scope.userAccountBoxTransparency = new Transitionable(1);


    //init flip object scope objects
    $scope.photoClicked = false;
    $scope.bioClicked = false;
    $scope.socialClicked = false;
    $scope.sessionClicked = false;
    $scope.tipsClicked = false;
    //flipping to view session or account page
    $scope.flipIt = function(option){
      switch(option){
        case 'photo':
          $scope.photoClicked = true;
          $scope.bioClicked = false;
          $scope.socialClicked = false;
          $scope.sessionClicked = false;
          $scope.tipsClicked = false;
          break;
        case 'bio':
          $scope.bioClicked = true;
          $scope.photoClicked = false;
          $scope.socialClicked = false;
          $scope.sessionClicked = false;
          $scope.tipsClicked = false;
          break;
        case 'social':
         $scope.photoClicked = false;
          $scope.bioClicked = false;
          $scope.sessionClicked = false;
          $scope.tipsClicked = false;
          $scope.socialClicked = true;
          break;
        case 'session':
          $scope.sessionClicked = true;
          $scope.photoClicked = false;
          $scope.bioClicked = false;
          $scope.socialClicked = false;
          $scope.tipsClicked = false;
          break;
        case 'tips':
          $scope.tipsClicked = true;
          $scope.photoClicked = false;
          $scope.bioClicked = false;
          $scope.socialClicked = false;
          $scope.sessionClicked = false;
          break;
        case 'original':
          break;
      }
      console.log('flipping');
       $famous.find('fa-flipper')[0].flip();
    };

    //example for fa-grid-layout

    $scope.winnerInformationGrid = {
       dimensions: [2,5] // specifies number of columns and rows
    };

    $scope.grids = [{
                      width : 70,
                      icon: 'img/person-icon-yellow.png',
                      click: 'photo'
                    },
                    {
                      width : undefined,
                      text: 'Photo',
                      click: 'photo'
                    },
                    {
                      width : 70,
                      icon: 'img/compose_icon_yellow.png',
                      click: 'bio'
                    },
                    {
                      width : undefined,
                      text: 'Bio',
                      click: 'bio'
                    },
                    {
                      width : 70,
                      icon: 'img/social-media-icon-yellow.png',
                      click: 'social'
                    },
                    {
                      width : undefined,
                      text: 'Social',
                      click: 'social'
                    },
                    {
                      width : 70,
                      icon: 'img/lightbulb-icon-yellow.png',
                      click: 'tips'
                    },
                    {
                      width : undefined,
                      text: 'Tips',
                      click: 'tips'
                    },
                    {
                      width : 70,
                      icon: 'img/clock-icon-yellow.png',
                      click: 'session'
                    },
                    {
                      width : undefined,
                      text: 'Session',
                      click: 'session'
                    }];

    //example arrays for views
    $scope.posts = [
                    {text: 'This is a spotlight text update that contains a max 160 characters. Users can: share quotes, ideas, questions, shout outs, etc. Tell your story, make it count.', image_url: null, created_at: '2015-04-15 12:33:29.706269', likes: 2, comments: 2000},
                    {text: 'This is a spotlight text update that contains a max 160 characters. Users can: share quotes, ideas, questions, shout outs, etc. Tell your story, make it count.', image_url: null, created_at: '2015-04-15 12:33:29.706269', likes: 400, comments: 2000},
                    {text: 'This is a spotlight text update that contains a max 160 characters. Users can: share quotes, ideas, questions, shout outs, etc. Tell your story, make it count.', image_url: 'http://fillmurray.com/300/400', created_at: '2015-04-15 12:33:29.706269', likes: 400, comments: 2000},
                    {text: 'This is a spotlight text update that contains a max 160 characters. Users can: share quotes, ideas, questions, shout outs, etc. Tell your story, make it count.', image_url: null, created_at: '2015-04-15 12:33:29.706269', likes: 400, comments: 2000},
                    {text: null, image_url:'http://fillmurray.com/200/400', created_at: '2015-04-15 12:33:29.706269', likes: 400, comments: 2000},
                    {text: null, image_url: 'http://fillmurray.com/500/300', created_at: '2015-04-15 12:33:29.706269', likes: 400, comments: 2000},
                    {text: 'This is a spotlight text update that contains a max 160 characters. Users can: share quotes, ideas, questions, shout outs, etc. Tell your story, make it count.', image_url: null, created_at: '2015-04-15 12:33:29.706269', likes: 400, comments: 2000},
                    {text: 'This is a spotlight text update that contains a max 160 characters. Users can: share quotes, ideas, questions, shout outs, etc. Tell your story, make it count.', image_url: null, created_at: '2015-04-15 12:33:29.706269', likes: 400, comments: 2000},
                    {text: null, image_url:'http://fillmurray.com/300/300', created_at: '2015-04-15 12:33:29.706269', likes: 400, comments: 2000},
                    {text: 'This is a spotlight text update that contains a max 160 characters. Users can: share quotes, ideas, questions, shout outs, etc. Tell your story, make it count.', image_url: null, created_at: '2015-04-15 12:33:29.706269', likes: 2, comments: 2000},
                    {text: 'This is a spotlight text update that contains a max 160 characters. Users can: share quotes, ideas, questions, shout outs, etc. Tell your story, make it count.', image_url: null, created_at: '2015-04-15 12:33:29.706269', likes: 400, comments: 2000},
                    {text: 'This is a spotlight text update that contains a max 160 characters. Users can: share quotes, ideas, questions, shout outs, etc. Tell your story, make it count.', image_url: 'http://fillmurray.com/300/400', created_at: '2015-04-15 12:33:29.706269', likes: 400, comments: 2000},
                    {text: null, image_url:'http://fillmurray.com/300/300', created_at: '2015-04-15 12:33:29.706269', likes: 400, comments: 2000},
                    {text: 'This is a spotlight text update that contains a max 160 characters. Users can: share quotes, ideas, questions, shout outs, etc. Tell your story, make it count.', image_url: 'http://fillmurray.com/200/300', created_at: '2015-04-15 12:33:29.706269', likes: 400, comments: 2000}];

    $scope.archivedDays = [
                            {name: 'james', date: '2015-04-11 15:33:29.706269'},
                            {name: 'jane', date: '2015-04-11 15:33:29.706269'},
                            {name: 'bob', date: '2015-04-11 15:33:29.7062695'},
                            {name: 'sally', date: '2015-04-11 15:33:29.706269'},
                            {name: 'james', date: '2015-04-11 15:33:29.706269'},
                            {name: 'jane', date: '2015-04-11 15:33:29.706269'},
                            {name: 'bob', date: '2015-04-11 15:33:29.706269'},
                            {name: 'sally', date: '2015-04-11 15:33:29.706269'},
                            {name: 'bob', date: '2015-04-11 15:33:29.706269'},
                            {name: 'sally', date: '2015-04-11 15:33:29.706269'},
                            {name: 'bob', date: '2015-04-11 15:33:29.706269'},
                            {name: 'sally', date: '2015-04-11 15:33:29.706269'},
                            {name: '', date: null}];

    $scope.archivedDayPosts = [
                    {text: 'This is a Spotlight text update that contains a max 160 characters. Users can: share quotes, ideas, questions, shout outs, etc. Tell your story, make it count.', image_url: null, created_at: '1999-01-08 04:05:06', likes: 2, comments: 2000},
                    {text: 'This is a Spotlight text update that contains a max 160 characters. Users can: share quotes, ideas, questions, shout outs, etc. Tell your story, make it count.', image_url: null, created_at: '1999-01-08 04:05:06', likes: 400, comments: 2000},
                    {text: 'This is a Spotlight text update that contains a max 160 characters. Users can: share quotes, ideas, questions, shout outs, etc. Tell your story, make it count.', image_url: 'http://fillmurray.com/300/400', created_at: '1999-01-08 04:05:06', likes: 400, comments: 2000},
                    {text: 'This is a Spotlight text update that contains a max 160 characters. Users can: share quotes, ideas, questions, shout outs, etc. Tell your story, make it count.', image_url: null, created_at: '1999-01-08 04:05:06', likes: 400, comments: 2000},
                    {text: null, image_url:'http://fillmurray.com/200/400', created_at: '1999-01-08 04:05:06', likes: 400, comments: 2000},
                    {text: null, image_url: 'http://fillmurray.com/500/300', created_at: '1999-01-08 04:05:06', likes: 400, comments: 2000},
                    {text: 'This is a Spotlight text update that contains a max 160 characters. Users can: share quotes, ideas, questions, shout outs, etc. Tell your story, make it count.', image_url: null, created_at: '1999-01-08 04:05:06', likes: 400, comments: 2000},
                    {text: 'This is a Spotlight text update that contains a max 160 characters. Users can: share quotes, ideas, questions, shout outs, etc. Tell your story, make it count.', image_url: null, created_at: '1999-01-08 04:05:06', likes: 400, comments: 2000},
                    {text: null, image_url:'http://fillmurray.com/300/300', created_at: '1999-01-08 04:05:06', likes: 400, comments: 2000},
                    {text: 'This is a Spotlight text update that contains a max 160 characters. Users can: share quotes, ideas, questions, shout outs, etc. Tell your story, make it count.', image_url: 'http://fillmurray.com/200/300', created_at: '1999-01-08 04:05:06', likes: 400, comments: 2000}];


    $scope.comments = [
                            {text: 'james', date: '2015-04-11 15:33:29.706269'},
                            {text: 'jane', date: '2015-04-11 15:33:29.706269'},
                            {text: 'bob', date: '2015-04-11 15:33:29.7062695'},
                            {text: 'sally', date: '2015-04-11 15:33:29.706269'},
                            {text: 'james', date: '2015-04-11 15:33:29.706269'},
                            {text: 'jane', date: '2015-04-11 15:33:29.706269'},
                            {text: 'bob', date: '2015-04-11 15:33:29.706269'},
                            {text: 'sally', date: '2015-04-11 15:33:29.706269'},
                            {text: 'bob', date: '2015-04-11 15:33:29.706269'},
                            {text: 'sally', date: '2015-04-11 15:33:29.706269'},
                            {text: 'bob', date: '2015-04-11 15:33:29.706269'},
                            {text: 'sally', date: '2015-04-11 15:33:29.706269'},
                            {text: '', date: null}];

    //making ids for example archived days
    $scope.makeIdsForExample = function(){
      for(var i = 0; i < $scope.archivedDays.length; i++){
        $scope.archivedDays[i].id = i;
      }
    };
    $scope.makeIdsForExample();

    //making ids for example posts
    $scope.makeIdsForPosts = function(){
      for(var i = 0; i < $scope.posts.length; i++){
        $scope.posts[i].id = i;
      }
    };
    $scope.makeIdsForPosts();

    //helper function to add a color property archiveViews
    var _colors = ['#E1ECF2', '#ECFFFF'];
    function addColorProperty(){
      for(var i = 0; i < $scope.archivedDays.length; i++){
        if(i % 2 === 0){
          $scope.archivedDays[i].color = _colors[0];
        } else {
          $scope.archivedDays[i].color = _colors[1];
        }
      }
    }
    addColorProperty();

    //helper function to calculate size for main spotlight scroll
    $scope.mainScrollHeight = 100;
    function measureHeightForScroll(){
      for(var i = 0; i < $scope.posts.length; i++){
        if($scope.posts[i].image_url && $scope.posts[i].text){
          $scope.mainScrollHeight += 511;
        } else if($scope.posts[i].image_url === null && $scope.posts[i].text){
          $scope.mainScrollHeight += 211;
        } else if ($scope.posts[i].image_url && $scope.posts[i].text === null){
          $scope.mainScrollHeight += 311;
        } else {
          return;
        }
      }
      console.log($scope.mainScrollHeight);
    }

    measureHeightForScroll();

    //helper function to calculate size for archived day scroll
    $scope.dayScrollHeight = 100;
    function measureHeightForDayScroll(){
      for(var i = 0; i < $scope.archivedDayPosts.length; i++){
        if($scope.archivedDayPosts[i].image_url && $scope.archivedDayPosts[i].text){
          $scope.dayScrollHeight += 511;
        } else if($scope.archivedDayPosts[i].image_url === null && $scope.archivedDayPosts[i].text){
          $scope.dayScrollHeight += 211;
        } else if ($scope.archivedDayPosts[i].image_url && $scope.archivedDayPosts[i].text === null){
          $scope.dayScrollHeight += 311;
        } else {
          return;
        }
      }
      console.log($scope.dayScrollHeight);
    }

    measureHeightForDayScroll();

    //  //helper function to calculate size for archive scroll
    // $scope.archiveScrollHeight = 100;
    // function measureHeightForArchiveScroll(){
    //   for(var i = 0; i < $scope.archiveViews.length; i++){
    //       $scope.archiveScrollHeight += 100;
    //   }
    //   console.log($scope.archiveScrollHeight);
    // }

    // measureHeightForArchiveScroll();



    //$scope.getViewsHeight();
    //eventhandlers
    $scope.myEventHandler = new EventHandler();
    $scope.archiveScrollEventHandler = new EventHandler();
    $scope.eventHandler = new EventHandler();
    $scope.dayScrollEventHandler = new EventHandler();
    $scope.commentsScrollHandler = new EventHandler();


    //functions for getting the window width and height
    $scope.getPageWidth = function(){
      return window.innerWidth;
    };
    $scope.getPageHeight = function(){
      return window.innerHeight;
    };
    // $scope.getViewsHeight = function(){
    //   return $scope.views.length * 600;
    // };

    //this is the option object instantiating page view transitions and constraints
    $scope.options = {
      scrollViewTwo: {
        direction: 0,
        paginated: true,
        speedLimit: 15
      },
       scrollViewOne: {
        direction: 1,
        paginated: true,
         speedLimit: 15
      },
       scrollViewThree: {
        direction: 1,
        paginated: true,
        speedLimit: 15
      },
      container: {
        clipSize: 500,
        paginated: false,
        speedLimit: 15
      },
      tipsContainer: {
        clipSize: 300
      }
    };

    $scope.testHeight = 600;

    // $timeout(function(){
    //   $famous.find('#main-scrollview')[0].renderNode.sync.on('start', function(event){
    //     var test = angular.element(document.querySelector('#main-view'));
    //     $scope.testHeight = test[0].clientHeight;
    //     console.log('test object', test);
    //     console.log($scope.testHeight);
    //   });
    // }, 1000);

    // $scope.getTestHeight = function(){
    //   return $scope.testHeight;
    // };

    //this is the section enabling spotlight scrolling with navbar and icon animation
    var scrollView;
    $scope.scrollViewHandler = new EventHandler();
    $timeout(function(){
      scrollView = $famous.find('#main-scrollview')[0].renderNode;
      $scope.scrollViewHandler = scrollView.sync;
       $scope.scrollViewHandler.on('start', function(event){
          //console.log('start', event);
          // console.log('size', scrollView.getSize());
          // console.log('start event position', scrollView.getPosition());
          // console.log('start event velocity', scrollView.getVelocity());
        });
       $scope.scrollViewHandler.on('end', function(event){
          // console.log('end event', event);
          // console.log('end event position', scrollView.getPosition());
          // console.log('end event velocity', scrollView.getVelocity());
          // console.log('get current index', scrollView.getCurrentIndex());
          // console.log('size', scrollView.getSize());
          // console.log('get position', scrollView.getPosition());
          // console.log('get absolute position', scrollView.getAbsolutePosition());

          var windowHeight = window.innerHeight;
          if(scrollView.getVelocity() > 0){
            //console.log('turn header off');
            //$scope.spotlightHeaderOn= false;
            $scope.boxTransitionableHeader.set([0, -40, 0], {duration: 300, curve: Easing.easeOut});
            $scope.boxTransitionableFooter.set([0, windowHeight, 0], {duration: 300, curve: Easing.easeOut});
            $scope.opacityTrans.set([0], {duration: 300});
            $scope.$digest();
          } else {
            $scope.boxTransitionableHeader.set([0, 0, 0], {duration: 300, curve: Easing.easeIn});
            $scope.boxTransitionableFooter.set([0, 0, 0], {duration: 300, curve: Easing.easeIn});
            $scope.opacityTrans.set([1], {duration: 300});
            $scope.$digest();
          }
        });
    }, 1000);


   //  //this is the section enabling archive scrolling with navbar and icon animation
   //  var archiveScrollView;
   //  $scope.scrollViewHandlerArchive = new EventHandler();
   //  $timeout(function(){
   //    archiveScrollView = $famous.find('#archive-scrollview')[0].renderNode;
   //    $scope.scrollViewHandlerArchive = archiveScrollView.sync;
   //     $scope.scrollViewHandlerArchive.on('start', function(event){
   //        // console.log('start', event);
   //        // console.log('start event position', scrollView.getPosition());
   //        // console.log('start event velocity', scrollView.getVelocity());
   //      });
   //     $scope.scrollViewHandlerArchive.on('end', function(event){
   //        // console.log('end event', event);
   //        // console.log('end event position', scrollView.getPosition());
   //        // console.log('end event velocity', scrollView.getVelocity());
   //        var archiveWindowHeight = window.innerHeight;
   //        if(archiveScrollView.getVelocity() > 0){
   //          //console.log('turn header off');
   //          $scope.boxTransitionableHeader2.set([0, -40, 0], {duration: 300, curve: Easing.easeOut});
   //          $scope.boxTransitionableFooter2.set([0, archiveWindowHeight, 0], {duration: 300, curve: Easing.easeOut});
   //          $scope.opacityTrans2.set([0], {duration: 300});
   //          $scope.$digest();
   //        } else{
   //          $scope.boxTransitionableHeader2.set([0, 0, 0], {duration: 300, curve: Easing.easeIn});
   //          $scope.boxTransitionableFooter2.set([0, 0, 0], {duration: 300, curve: Easing.easeIn});
   //          $scope.opacityTrans2.set([1], {duration: 300});
   //          $scope.$digest();
   //        }
   //      });
   //  }, 1000);

   // //this is the section enabling show day scrolling with navbar and icon animation
   //  var dayScrollView;
   //  $scope.scrollViewHandlerDay = new EventHandler();
   //  $timeout(function(){
   //    dayScrollView = $famous.find('#day-scrollview')[0].renderNode;
   //    $scope.scrollViewHandlerDay = dayScrollView.sync;
   //     $scope.scrollViewHandlerDay.on('start', function(event){
   //        // console.log('start', event);
   //        // console.log('start event position', scrollView.getPosition());
   //        // console.log('start event velocity', scrollView.getVelocity());
   //      });
   //     $scope.scrollViewHandlerDay.on('end', function(event){
   //        // console.log('end event', event);
   //        // console.log('end event position', scrollView.getPosition());
   //        // console.log('end event velocity', scrollView.getVelocity());
   //        var dayWindowHeight = window.innerHeight;
   //        if(dayScrollView.getVelocity() > 0){
   //          //console.log('turn header off');
   //          $scope.boxTransitionableHeader3.set([0, -40, 0], {duration: 300, curve: Easing.easeOut});
   //          $scope.boxTransitionableFooter3.set([0, dayWindowHeight, 0], {duration: 300, curve: Easing.easeOut});
   //          $scope.opacityTrans3.set([0], {duration: 300});
   //          $scope.$digest();
   //        } else{
   //          $scope.boxTransitionableHeader3.set([0, 0, 0], {duration: 300, curve: Easing.easeIn});
   //          $scope.boxTransitionableFooter3.set([0, 0, 0], {duration: 300, curve: Easing.easeIn});
   //          $scope.opacityTrans3.set([1], {duration: 300});
   //          $scope.$digest();
   //        }
   //      });
   //  }, 1000);



    // //Switch page function
    $scope.changePageHandler = new EventHandler();
    $scope.switchPage = function(pageToGoTo){
      var pageView = $famous.find('#home')[0].renderNode;
      //console.log(pageView);
      $scope.changePageHandler = pageView.sync;
      //console.log($scope.changePageHandler);
      //var pageToGoTo = (currentPage) ? 0 : 1;
      pageView.goToPage(pageToGoTo);
    };

    //Go to archived day function
    $scope.goToArchivedDay = function(id){
      //make a call to the database to find the day by id and return it's contents
     //switch to show day view
      //console.log(id);
      $scope.switchPage(2);

    };

      //open post box animation
    $scope.openPostBox = function($event){
      var pageWidth = $scope.getPageWidth(),
       pageHeight = $scope.getPageHeight();
      $scope.boxTransitionableSpotlightPost.set([0, 60, 0], {duration: 300, curve: Easing.easeIn});
      $scope.postboxSize.set([pageWidth, pageHeight], {duration: 300, curve: Easing.easeIn});
      $scope.postboxTransparency.set([1], {duration: 300});
    };

    $scope.closePostbox = function(){
      $scope.boxTransitionableSpotlightPost.set([0, windowInnerHeight, 0], {duration: 300, curve: Easing.easeIn});
      $scope.postboxSize.set([windowWidth,windowInnerHeight], {duration: 300, curve: Easing.easeIn});
      $scope.postboxTransparency.set([0], {duration: 300});
    };

    $scope.showAccount = function(){
      var pageWidth = $scope.getPageWidth(),
       pageHeight = $scope.getPageHeight();
      $scope.boxTransitionableSpotlightAccount.set([0, 60, 0], {duration: 300, curve: Easing.easeIn});
      $scope.accountBoxSize.set([pageWidth, pageHeight], {duration: 300, curve: Easing.easeIn});
      $scope.accountBoxTransparency.set([1], {duration: 300});
    };

    $scope.closeAccountPage = function(){
      $scope.boxTransitionableSpotlightAccount.set([0, windowInnerHeight, 0], {duration: 300, curve: Easing.easeIn});
      $scope.accountBoxSize.set([windowWidth,windowInnerHeight], {duration: 300, curve: Easing.easeIn});
      $scope.accountBoxTransparency.set([0], {duration: 300});
    };

    $scope.showWinnerInfo = function(){
       var pageWidth = $scope.getPageWidth(),
       pageHeight = $scope.getPageHeight();
      $scope.boxTransitionableWinnerInfo.set([0, 60, 0], {duration: 300, curve: Easing.easeIn});
      $scope.winnerInfoBoxSize.set([pageWidth, pageHeight], {duration: 300, curve: Easing.easeIn});
      $scope.winnerInfoBoxTransparency.set([1], {duration: 300});
    };

    $scope.closeWinnerInfo = function(){
      $scope.boxTransitionableWinnerInfo.set([0, windowInnerHeight, 0], {duration: 300, curve: Easing.easeIn});
      $scope.winnerInfoBoxSize.set([windowWidth,windowInnerHeight], {duration: 300, curve: Easing.easeIn});
      $scope.winnerInfoBoxTransparency.set([1], {duration: 300});
    };

    $scope.showConfirmationDialog = function(){
       var pageWidth = $scope.getPageWidth(),
       pageHeight = $scope.getPageHeight();
      $scope.boxTransitionableConfirmation.set([0, 60, 0], {duration: 300, curve: Easing.easeIn});
      $scope.confirmationBoxSize.set([pageWidth, pageHeight], {duration: 300, curve: Easing.easeIn});
      $scope.confirmationBoxTransparency.set([1], {duration: 300});
    };

    $scope.closeConfirmationDialog = function(){
      $scope.boxTransitionableConfirmation.set([0, windowInnerHeight, 0], {duration: 300, curve: Easing.easeIn});
      $scope.confirmationBoxSize.set([windowWidth,windowInnerHeight], {duration: 300, curve: Easing.easeIn});
      $scope.confirmationBoxTransparency.set([1], {duration: 300});
    };

   $scope.showRegistration = function(done){
      $scope.userNotSignedIn = true;
      $scope.login = true;
      $scope.userIsInTheSpotlight = false;
      console.log('registration');
      var pageWidth = $scope.getPageWidth(),
       pageHeight = $scope.getPageHeight();
      $scope.boxTransitionableHeader2.set([0, 0, 0], {duration: 300, curve: Easing.easeIn});

      $scope.boxTransitionableRegistration.set([0, 0, 0], {duration: 300, curve: Easing.easeIn});
      $scope.registrationBoxSize.set([pageWidth, pageHeight], {duration: 300, curve: Easing.easeIn});
      $scope.registrationBoxTransparency.set([1], {duration: 300});
    };

    $scope.closeRegistration = function(){
      console.log('registration');
      $scope.boxTransitionableRegistration.set([0, windowInnerHeight, 0], {duration: 300, curve: Easing.easeIn});
      $scope.registrationBoxSize.set([windowWidth, 0], {duration: 300, curve: Easing.easeIn});
      $scope.registrationBoxTransparency.set([1], {duration: 300});
      // $scope.login = false;
    };

    $scope.showUserAccount = function(){
      var pageWidth = $scope.getPageWidth(),
       pageHeight = $scope.getPageHeight();
      $scope.boxTransitionableUserAccount.set([window.innerWidth, 0, 0], {duration: 300, curve: Easing.easeIn});
      $scope.userAccountBoxSize.set([pageWidth, pageHeight], {duration: 300, curve: Easing.easeIn});
      $scope.userAccountBoxTransparency.set([1], {duration: 300});
    };

    $scope.closeUserAccount = function(){
      $scope.boxTransitionableUserAccount.set([window.innerWidth, windowInnerHeight, 0], {duration: 300, curve: Easing.easeIn});
      $scope.userAccountBoxSize.set([windowWidth, windowInnerHeight], {duration: 300, curve: Easing.easeIn});
    };

    $scope.changePageHandler = new EventHandler();
    $scope.showComments = function(id){
      //first call to bring in the comments associated with that post id
      console.log('post id', id);
      //then slide to view
      var pageView = $famous.find('#home')[0].renderNode;
      $scope.changePageHandler = pageView.sync;
      pageView.goToPage(1);
    };

    // comments modal
    $scope.postId = 'init';
    // $scope.commentsModal = function(id){
    //   console.log(id);
    //   ngDialog.open({
    //       template: 'templates/comments-modal.html',
    //       data: {'post' : id},
    //       controller: 'CommentsCtrl'
    //   });
    //   console.log('modal');
    // };

    // // account modal
    // $scope.accountModal = function(){
    //   ngDialog.open({
    //       template: 'templates/account-modal.html',
    //       controller: 'AccountCtrl'
    //   });
    //   console.log('account-modal');
    // };

    // //login modal
    //  $scope.loginModal = function(){
    //   ngDialog.open({
    //       template: 'templates/login-modal.html',
    //       controller: 'LoginCtrl'
    //   });
    //   console.log('login-modal');
    // };


    // $scope.closeDialog = function(){
    //   ngDialog.close('', '');
    // };

    //like event
    $scope.like = function(post){
      post.likes += 1;
    };

    //switch states
    $scope.goToCategories = function(){
      console.log('going to category view');
      $state.go('categories');
    };

    //Go to archived day function
    $scope.goToArchivedDay = function(id){
      //make a call to the database to find the day by id and return it's contents
     //switch to show day view
      //console.log(id);
      $scope.switchPage(2);
    };
  }]);
})();
