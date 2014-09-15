'use strict';

angular.module('DojoApp.filters')
  .filter('capitalize', function() {
    return function(input) {
      return input.toString().toUpperCase();
    };
  });