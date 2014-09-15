/*jshint globalstrict: true*/
/*global angular*/
'use strict';

angular.module('DojoApp.components')
    .service('messageBus', ['errorException', '$rootScope', function(errorException, $rootScope) {
        var messages = [];

        return {
            'get': function() {
                return messages;
            },
            'set': function(data) {
                // required fields
                if(! data.type) {
                    throw new errorException('Message Bus Data Type', 'Incorrect data type is detected');
                }
                if(! data.message) {
                    throw new errorException('Message Bus Message', 'Message is not found');
                }

                messages.push(data);

                $rootScope.$broadcast('messageBus', {
                    'type'   : 'update',
                    'message': 'Message stack is updated'
                });
            },
            'all': function() {
                return messages;
            }
        };
    }]);