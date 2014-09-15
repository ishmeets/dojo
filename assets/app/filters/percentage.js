'use strict';

angular.module('DojoApp.filters')
  .filter('percentage', function() {
    return function(input) {
      return ! isNaN(input) ? parseFloat(input, 2) + '%' : null;
    };
  });