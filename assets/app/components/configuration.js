'use strict';

angular.module('DojoApp.components')
    .constant('configuration', {
        'baseUrl': 'http://app.houseding.com',
        'webservices': {
            'user'    : {
                'login'         : '/user/login',
                'register'      : '/user/register',
                'logout'        : '/user/logout',
                'getUserInfo'   : '/user/getUserInfo',
                'isUserLoggedIn': '/user/isUserLoggedIn'
            },
            'property': {
                'search': '/property/search'
            }
        }
    });