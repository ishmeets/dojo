'use strict';

angular.module('DojoApp.services')
  .service('stats', ['$resource', function($resource) {

    var url = '/stats/';

    return $resource(url, {}, {
      'city'  : {},
      'radius': {}
    });

  }]);