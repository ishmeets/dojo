'use strict';

angular.module('DojoApp.services')
  .service('CityService', ['$http', '$q', '$timeout', '$resource', function($http, $q, $timeout, $resource) {
    var url = '/city/:id';
    return $resource(url);
  }]);