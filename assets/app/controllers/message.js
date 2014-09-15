'use strict';

angular.module('DojoApp.controllers')
    .controller('MessageController', ['$scope', 'messageBus', '$timeout', function(
                                       $scope,   messageBus,   $timeout) {

        // -------------------------------------------
        // Scope Variables
        // -------------------------------------------

        $scope.messages = [];

        // -------------------------------------------
        // Scope Functions
        // -------------------------------------------

        $scope.$on('messageBus', function(info, data) {
            if (data.type === 'update') {
                $timeout(function() {
                    $scope.messages = messageBus.all();
                });
            }
        });

        $scope.clickCloseMessage = function($event, arrayKey) {
            $scope.messages.splice(arrayKey, 1);
        };
    }]);