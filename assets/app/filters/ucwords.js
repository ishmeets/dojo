'use strict';

angular.module('DojoApp.filters')
  .filter('ucwords', function() {
    return function(input) {
      input = input.toString();
      var output = '';
      for(var i = 0; i < input.length; i ++) {
        output += (i === 0 || (i > 0 && input.charAt(i - 1) === ' ')) ? input.charAt(i).toUpperCase() : input.charAt(i);
      }

      return output;
    };
  });