'use strict';

angular.module('DojoApp.components')
    .factory('errorException', function() {

        var exception = function(name, message) {
            this.name = name;
            this.message = message;
        };
        exception.prototype.toString = function() {
            return this.name + ' : ' + this.message;
        };

        return exception;
    });