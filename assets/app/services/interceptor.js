'use strict';

angular.module('DojoApp.services')
  .factory('messageBusInterceptor', ['configuration', '$location', '$q', '$window', 'messageBus', function(configuration, $location, $q, $window, messageBus) {
    return {
      request : function(request) {
        return request;
      },

      // check and see if response has any error messages, append them to the messageBus
      response: function(response) {
        if(response && response.data && response.data.status) {
          if(response.data.messages) {
            if(typeof(response.data.messages) === 'string') {
              response.data.messages = [response.data.messages];
            }
            if(angular.isArray(response.data.messages)) {
              angular.forEach(response.data.messages, function(item, key) {
                if(! ! response.data.displayMessage || typeof response.data.displayMessage === 'undefined') {
                  messageBus.set({
                    'type'   : response.data.status,
                    'message': item
                  });
                }
              });
            }
          }
        }

        return response;
      }
    };
  }])

  // Http Interceptor to check auth failures for xhr requests
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.xsrfHeaderName = '_csrf';
    $httpProvider.interceptors.push('messageBusInterceptor');
  }]);