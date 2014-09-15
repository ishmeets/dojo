'use strict';

angular.module('DojoApp.components')
    .service('websocket', ['$location', function(
                            $location) {
        return {
            socket: io.connect($location.protocol() +'://'+ $location.host() +':'+ $location.port())
        };
    }]);