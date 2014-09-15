'use strict';

angular.module('DojoApp.controllers')
    .controller('HeaderController', ['$scope', '$http', '$routeParams', '$resource', '$q', '$filter', 'spinnerService', '$window', '$location', '$log', '$modal', 'configuration', 'csrfToken', 'errorException', 'messageBus', 'userInfo', 'websocket', '$timeout', '$rootScope', function(
                                      $scope,   $http,   $routeParams,   $resource,   $q,   $filter,   spinnerService,   $window,   $location,   $log,   $modal,   configuration,   csrfToken,   errorException,   messageBus,   userInfo,   websocket,   $timeout,   $rootScope) {

        // -------------------------------------------
        // Scope Variables
        // -------------------------------------------

        $scope.userIsLoggedIn  = false;
        $scope.email           = '';
        $scope.showLogin       = false;

        // -------------------------------------------
        // Private
        // -------------------------------------------

        var bootstrap = function () {
            userInfo().then(function(data) {
                try {
                    $timeout(function() {
                        $scope.userIsLoggedIn = data.userIsLoggedIn;
                        $scope.userEmail      = data.userInfo.email;
                        $scope.userFirstName  = data.userInfo.first_name;
                        $scope.userLastName   = data.userInfo.last_name;
                        $scope.userId         = data.userInfo.id;
                        $scope.userType       = data.userInfo.user_type;
                    });

                    // fire userLogin event is user is logged in
                    if (data.userIsLoggedIn /* cannot use $scope.userIsLoggedIn because it is set in timeout */ === true) {
                        console.log('fire user login event');
                        $rootScope.$broadcast('userLogin', data.userInfo, data.userInfo);
                    }

                    // listen to web sockets
                    websocketSubscribe();
                }
                catch (ex) {
                    // do nothing. try to catch exception that field is not found
                }
            });
        };

        // -------------------------------------------
        // Scope Functions
        // -------------------------------------------

        $scope.clickRegister = function($event) {
            $log.log('click register');

            var modalInstance = $modal.open({
              templateUrl : '/js/views/partials/modals/register.html',
              controller  : 'ModalRegisterController'
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.clickLogin = function ($event) {
            // prevent the button from submitting
            $event.preventDefault();
            csrfToken.then(function (data) {
                $http.post(configuration.webservices.user.login, {
                    'email'   : $scope.inputEmail,
                    'password': $scope.inputPassword,
                    '_csrf'   : data.csrf
                }).then(function (data) {
                    try {
                        if (data.data.status === 'success') {
                            bootstrap();
                        }
                    }
                    catch (ex) {
                        // do nothing
                    }
                });
            });
        };

        $scope.clickLogOut = function($event) {
            $http.get(configuration.webservices.user.logout)
                .then(function(data) {
                    try {
                        if (data.data.status === "success") {
                            $timeout(function() {
                                $scope.userIsLoggedIn = false;
                            });

                            // fire userLogout event
                            $scope.$emit('userLogout', null);
                        }
                    }
                    catch (ex) {
                        messageBus.set({
                            'type'   : 'error',
                            'message': 'Failed to logged out. Please try agian.'
                        });
                    }
                });
        };

        // submit the search form
        $scope.clickSubmit = function(inputState, inputCity) {
            $location.path('/stats/'+ inputState.toString().trim().toLowerCase() +'/' + inputCity.toString().trim().toLowerCase());
        };

        $scope.onSearch = function(inputString) {
            CitiesService.getCities(inputString).then(function(data){
                $timeout(function() {
                    $scope.cities = data;
                });
            });
        };

        $scope.clickLoginButton = function($event) {
            $scope.showLogin = true;
        };

        // -------------------------------------------
        // Bootstrap
        // -------------------------------------------

        bootstrap();

    }]);