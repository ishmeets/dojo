'use strict';

angular.module('DojoApp.components')
    .service('csrfToken', ['$http', '$q', function($http, $q) {

        var deferred = $q.defer();
        var csrfToken = null;

        $http.get('/csrfToken').then(function(data) {
            if(data.data._csrf) {
                deferred.resolve({
                    csrf: data.data._csrf
                });
            }
        });

        return deferred.promise;
    }]);