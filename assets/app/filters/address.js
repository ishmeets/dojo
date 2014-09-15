'use strict';

angular.module('DojoApp.filters')
  .filter('address', function() {

    return function(input) {

      if(input) {
        var addressNumber = input.address_number || '';
        var addressStreet = input.address_street || '';
        var addressStreet2 = input.address_street2 || '';
        var city = input.city || '';
        var state = input.state || '';
        var zipCode = input.zip || '';
        var country = input.country || '';

        var output = '';
        if(addressNumber && addressStreet && city && state && zipCode) {
          output += addressNumber;
          output += ' ' + addressStreet;
          if(addressStreet2) {
            output += ' ' + addressStreet2;
          }
          output += "\n" + city + ', ' + state + ' ' + zipCode + ' ' + country;
        }
        return output;
      }
    }
  })