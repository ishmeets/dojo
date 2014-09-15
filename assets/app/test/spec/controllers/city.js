'use strict';

describe('Controllers', function() { 

    var $scope
      , $rootScope
      , $location
      , cityController
      , $routeParams;

    beforeEach(module('DojoApp.controllers'));
    beforeEach(module('ngRoute'));
    beforeEach(module('ngResource'));
    beforeEach(module('angularSpinner'));

    beforeEach(inject(function($injector, $controller) {
        $location    = $injector.get('$location');
        $rootScope   = $injector.get('$rootScope');
        // var spinnerService = $injector.get('spinnerService');
        $routeParams = $injector.get('$routeParams');

        $scope       = $rootScope.$new();

        var $controller = $injector.get('$controller');

        /*
        cityController = function() {
            return $controller('CityController', {
                '$scope'            : $scope,
                '$routeParams'      : $routeParams
            });
        };
        */
    }));

    /*
    it('state should contain state', function() {


        var controller = cityController();
        console.log('see this controller');
        console.log(controller);

        $location.path('/search/california/walnut-creek/residential');

        expect($scope.state).toBe('california');
    });
    */
});