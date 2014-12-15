(function(){
    'use strict';

    angular.module('hapi-auth')
        .controller('HomeCtrl', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state){
            $scope.messages = [];

            $scope.chat = function(msg){
                socket.emit('globalChat', {avatar:$rootScope.rootuser.avatar, content:msg});
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
