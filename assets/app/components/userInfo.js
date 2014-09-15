/*jshint globalstrict: true*/
/*global angular*/
'use strict';

angular.module('DojoApp.components')
    .factory('userInfo', ['errorException', '$q', 'configuration', '$http', function(errorException, $q, configuration, $http) {

        return function() {
            var deferred = $q.defer();
            var user = {};

            $q.all([
                    $http.get(configuration.webservices.user.isUserLoggedIn),
                    $http.get('/csrfToken'),
                    $http.get(configuration.webservices.user.getUserInfo)
                ]).then(
                // success
                function(data) {
                    if(data[2].data.status === 'error') {
                        deferred.reject('user is not logged in');
                    }
                    else {
                        user.userIsLoggedIn = data[0].data.data.logged_in;
                        user.csrf = data[1].data._csrf;
                        user.userInfo = data[2].data.data;

                        deferred.resolve(user);
                    }
                },
                // error
                function() {
                    deferred.reject('user is not logged in');
                }
            );

            return deferred.promise;
        };
    }]);