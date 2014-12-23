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
              });
            };

            $scope.winnerInfo = function(){
              $scope.showWinner = ($scope.showWinner) ? false : true;
            };

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
