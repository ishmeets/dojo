'use strict';

/* jshint globalstrict: true */
/* global angular, require */

// module dependencies declaration
angular.module('angularDataTable', []);
angular.module('DojoApp.directives', []);
angular.module('DojoApp.filters', []);
angular.module('DojoApp.services', []);
angular.module('DojoApp.components', []);
angular.module('DojoApp.controllers', []);

// initialize the app
var DojoApp = angular.module('DojoApp', [
    'ngRoute',
    'ngResource',
    'ui.bootstrap',
    'DojoApp.controllers',
    'DojoApp.filters',
    'DojoApp.services',
    'DojoApp.directives',
    'DojoApp.components',
    'angularDataTable',
    'angularSpinner',
    'anchorSmoothScroll'
  ])
  .factory('mySocket', function(socketFactory) {
    var mySocket = socketFactory();
    mySocket.forward('error');
    return mySocket;
  })
  .config(['$routeProvider', 'routes', function($routeProvider, routes) {
    angular.forEach(routes, function(item) {
      $routeProvider.when(item.url, item);
    });

    $routeProvider
      .otherwise({
        redirectTo : '/page-not-found',
        templateUrl: 'js/views/partials/pageNotFound.html'
      });
  }]);

require([
  'app/config.js' // define paths & shims and require
], function() {

  console.log('finished loading');

  angular.bootstrap(document, ['DojoApp']);
});