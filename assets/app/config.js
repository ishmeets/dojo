/*jshint globalstrict: true*/
/*global _, requirejs, define */

'use strict';

// all the files here will be loaded automagically
var files = {

  // -------------------------------------------
  // Packages
  // -------------------------------------------

  'ngAnimate'           : '../bower_components/angular-animate/angular-animate.min',
  'jquerySticky'        : '../bower_components/jquery.sticky/jquery.sticky',
  'angularRoute'        : '../bower_components/angular-route/angular-route.min',
  'angularUIrouter'     : '../bower_components/angular-ui-router/release/angular-ui-router.min',
  'angularResource'     : '../bower_components/angular-resource/angular-resource.min',
  'angularUI'           : '../bower_components/angular-ui/build/angular-ui.min',
  'angularBootstrap'    : '../bower_components/angular-bootstrap/ui-bootstrap.min',
  'angularBootstrapTpls': '../bower_components/angular-bootstrap/ui-bootstrap-tpls.min',

  // -------------------------------------------
  // Angular controllers
  // -------------------------------------------

  'IndexController'        : 'controllers/index',
  'HeaderController'       : 'controllers/header',
  'MessageController'      : 'controllers/message',
  'NavigationController'   : 'controllers/navigation',
  'ModalRegisterController': 'controllers/modals/register',

  // -------------------------------------------
  // Angular directives
  // -------------------------------------------

  'amchartsDirective'        : 'directives/amcharts',
  'angularDataTableDirective': 'directives/angularDataTable',
  'keyupDirective'           : 'directives/keyup',
  'anchorSmoothScroll'       : 'directives/anchorSmoothScroll',
  'angularSpinner'           : 'directives/angularSpinner',

  // -------------------------------------------
  // Angular filters
  // -------------------------------------------

  'addressFilter'   : 'filters/address',
  'capitalizeFilter': 'filters/capitalize',
  'percentageFilter': 'filters/percentage',
  'ucwordsFilter'   : 'filters/ucwords',

  // -------------------------------------------
  // Angular services
  // -------------------------------------------

  'cityService'       : 'services/city',
  'statsService'      : 'services/stats',
  'interceptorService': 'services/interceptor',
  'propertyService'   : 'services/property',

  // -------------------------------------------
  // Angular components
  // -------------------------------------------

  'configurationComponent': 'components/configuration',
  'csrfTokenComponent'    : 'components/csrfToken',
  'messageBusComponent'   : 'components/messageBus',
  'errorException'        : 'components/errorException',
  'userInfo'              : 'components/userInfo',
  'websocket'             : 'components/websocket',
  'routes'                : 'components/routes'
};

// set the loading order
var loadOrder = (function() {
  var loadFiles = [];
  _.forEach(files, function(item, key) {
    loadFiles.push(key);
  });
  return loadFiles;
})();

// RequireJS settings
requirejs.config({
  baseUrl    : './app/',
  waitSeconds: 200,
  paths      : files,
  shim       : {
    'underscore': { deps: ['jquery'], exports: '_' },
    'backtotop' : { deps: ['jquery'] }
  }
});

define(loadOrder, function() {
  // do nothing. The world starts here
});