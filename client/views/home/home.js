(function(){
    'use strict';

    angular.module('hapi-auth')
        .controller('HomeCtrl', ['$rootScope', '$scope', '$state', 'User', function($rootScope, $scope, $state, User){
            $scope.messages = [];
            $scope.winner = {};
            $scope.lotteryNum = null;
            $scope.winner = null;
            $scope.showAdmin = false;
            $scope.showWinner = false;
            $scope.spotlight = {};
            $scope.stage = false;
            $scope.confirmed = false;

            //check to see if rootuser is in the spotlight
            User.isSpotlightOn().then(function(response){
              console.log('response from isSpotlightOn', response);
              $scope.stage = (response.data.confirmed) ? true : false;
            });


            //manual lottery
            $scope.runLottery = function(){
              //run function if rootuse is admin - cosmetic since real validation runs on server
              if($rootScope.rootuser.id !== 1){return;}
              User.runLottery().then(function(response){
                //console.log('getting all users, in scope', response);
                //console.log('response from lotter', response);
                if(response.data !== ''){
                  $scope.showAdmin = true;
                }
                $scope.winner = response.data;
              });
            };

            //select a lottery winner on load
            $scope.runLottery();

            //set winner as spotlight
            $scope.selectWinner = function(id){
              //console.log(id);
              User.selectWinner(id).then(function(response){
                //console.log(response);
                $scope.winner = response.data;
                //console.log($scope.winner.id);
                //create winner variable and emit info
                var winner = $scope.winner;
                console.log('winner received and being emitted', winner);
                socket.emit('spotlightChosen', {winner: winner});
              });
            };

            $scope.winnerInfo = function(){
              $scope.showWinner = ($scope.showWinner) ? false : true;
            };


            //notify the winner with an email and a password
            $scope.notifyWinner = function(){
              User.notifyWinner($scope.winner.id).then(function(){
                console.log('winner notified successfully');
              }, function(){
                console.log('failed to notify winner');
              });
            };


            //show winner password option
            socket.on('areYouTheSpotlight', function(data){
              $scope.selectedUser = data.winner.id;
              console.log('spotlight id', $scope.selectedUser);
              console.log('current user id', $rootScope.rootuser.id);
              if($rootScope.rootuser.id === $scope.selectedUser){
                  console.log('inside are you the spotlight if statement');
                  $scope.$apply(function(){
                    $scope.stage = true;
                  });
              } else {
                $scope.$apply(function(){
                  $scope.stage = false;
                });
              }
            });

            $scope.chat = function(msg){
                socket.emit('globalChat', {id: $scope.rootuser.id, content:msg});
            };


            socket.on('bGlobalChat', function(data){
                $scope.messages.unshift(data);
                $scope.messages = $scope.messages.slice(0, 100);
                $scope.message = null;
                $('#message').focus();
                $scope.$digest();
            });
        }]);
})();
