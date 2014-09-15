'use strict';

/* global angular */

angular.module('DojoApp.components')
    .constant('routes', [
        {
            url        : '/',
            templateUrl: 'js/views/partials/index.html'
        },
        {
            url        : '/stats',
            templateUrl: 'js/views/stats-page.html'
        },
        {
            url        : '/contact-us',
            templateUrl: 'js/views/partials/contact-us.html'
        },
        {
            url        : '/search/:state/:city/:type',
            templateUrl: 'js/views/partials/search.html'
        },
        {
            url        : '/stats/:state/:city',
            templateUrl: 'js/views/partials/stats.html'
        }
    ]);
