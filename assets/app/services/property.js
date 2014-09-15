'use strict';

angular.module('DojoApp.services')
  .service('PropertyService', ['$resource', function($resource) {

    var url = '/property/:type';

    return $resource(url, {
      'type': '@type'
    });
  }]);