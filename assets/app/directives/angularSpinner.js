'use strict';

angular.module('angularSpinner', [])

    .factory('spinnerService', ['$rootScope', function ($rootScope) {
        var config = {};

        config.start = function (key) {
            $rootScope.$broadcast('us-spinner:spin', key);
            jQuery('<div class="modal-backdrop"></div>').css({ 'opacity': 0.3 }).appendTo(jQuery('body'));
        };

        config.stop = function (key) {
            $rootScope.$broadcast('us-spinner:stop', key);
            jQuery('.modal-backdrop').remove();
        };

        return config;
    }])

    .directive('spinner', ['$window', '$rootScope', function ($window, $rootScope) {

        return {
            scope: true,
            controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                $scope.spinner = null;
                $scope.key = angular.isDefined($attrs.spinnerKey) ? $attrs.spinnerKey : false;

                $scope.startActive = angular.isDefined($attrs.spinnerStartActive) ?
                    $attrs.spinnerStartActive : $scope.key ?
                    false: true;

                $scope.spin = function () {
                    if ($scope.spinner) {
                        $scope.spinner.spin($element[0]);
                    }
                };

                $scope.stop = function () {
                    if ($scope.spinner) {
                        $scope.spinner.stop();
                    }
                };
            }],
            link: function (scope, element, attr) {

                scope.$watch(attr.spinner, function (options) {
                    scope.stop();
                    scope.spinner = new $window.Spinner(options);

                    if (!scope.key || scope.startActive) {
                        scope.spinner.spin(element[0]);
                    }

                }, true);

                $rootScope.$on('us-spinner:spin', function (event, key) {
                    if(key === scope.key){
                        scope.spin();
                    }
                });

                $rootScope.$on('us-spinner:stop', function (event, key) {
                    if(key === scope.key){
                        scope.stop();
                    }
                });

                scope.$on('$destroy', function () {
                    scope.stop();
                    scope.spinner = null;
                });
            }
        };
    }]);