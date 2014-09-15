"use strict";

/* global angular */

angular.module('DojoApp.controllers')
    .controller('ModalRegisterController', ['$scope', '$modal', '$modalInstance', '$http', 'configuration', '$log', 'csrfToken', 'messageBus', function(
                                             $scope,   $modal,   $modalInstance,   $http,   configuration,   $log,   csrfToken,   messageBus) {

        // to fix the stupid scope issue
        $scope.input = {};

        $scope.clickRegisterUser = function($event) {
            csrfToken.then(function(data) {
                $http.post(configuration.webservices.user.register, {
                    'email'     : $scope.input.email,
                    'first_name': $scope.input.firstName,
                    'last_name' : $scope.input.lastName,
                    'password'  : $scope.input.password,
                    'user_type' : $scope.input.userType,
                    '_csrf'     : data.csrf
                }).then(function(data) {
                    messageBus.set({
                        'type'   : 'error',
                        'message': 'Error creating user'
                    });
                });
            }, function(data) {
                messageBus.set({
                    'type'   : 'error',
                    'message': 'Failed to get CSRF token'
                });
            });

            return false;
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

    }]);