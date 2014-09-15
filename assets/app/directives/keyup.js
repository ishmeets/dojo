'use strict';

angular.module('DojoApp.directives')
  .directive('onKeyup', function() {
    return function(scope, elm, attrs) {
      elm.bind('keyup', function() {
        scope.$apply(attrs.onKeyup);
      });
    };
  });