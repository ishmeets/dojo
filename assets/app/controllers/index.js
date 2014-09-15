"use strict";

angular.module('DojoApp.controllers')
    .controller('IndexController',['$scope', '$routeParams', '$resource', '$location', '$compile', '$q', 'CitiesService', 'CityService', '$timeout', function(
                                    $scope,   $routeParams,   $resource,   $location,   $compile,   $q,   CitiesService,   CityService,   $timeout) {

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

    }]);