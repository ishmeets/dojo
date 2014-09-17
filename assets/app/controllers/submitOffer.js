'use strict';

/* global angular */

angular.module('DojoApp.controllers')
  .controller('SubmitOfferController', ['$scope', '$http', '$routeParams', '$resource', '$q', '$filter', 'spinnerService', '$window', '$location', '$log', 'PropertyService', 'userInfo', 'csrfToken', 'configuration', 'websocket', '$timeout', function($scope, $http, $routeParams, $resource, $q, $filter, spinnerService, $window, $location, $log, PropertyService, userInfo, csrfToken, configuration, websocket, $timeout) {

    // -------------------------------------------
    // Scope Variables
    // -------------------------------------------

    // Use nested variables so that nested controller won't accidentally delete the reference
    // with variable assignment
    $scope.p = $scope.p || {};
    $scope.v = $scope.v || {};

    $scope.p.country = $routeParams.country || 'usa';
    $scope.p.state = $routeParams.state || '';
    $scope.p.city = ($routeParams.state) ? $routeParams.city.toString().replace('-', ' ') : '';
    $scope.v.listOfRealtors = [];
    $scope.v.pageTitle = $filter('ucwords')($scope.p.city) + ', ' + $scope.p.state.toUpperCase();
    $scope.v.viewType = 'LIST';
    $scope.v.data = [];

    // -------------------------------------------
    // Private Variables
    // -------------------------------------------

    var theMap,
      buildMap = function(data) {

        var map = theMap = new GMaps({
          el : '#map',
          lat: data[2].latitude,
          lng: data[2].longitude
        });

        angular.forEach(data, function(item, index) {

          console.log('fire loop');
          console.log(item);

          if((item.latitude) && (item.longitude)) {
            map.addMarker({
              lat       : item.latitude,
              lng       : item.longitude,
              title     : item.address_number + ' ' + item.address_street,
              icon      : '/images/icons/house-icon.png',
              id        : item.id,
              infoWindow: {
                content: '<p>' + (item.address_number ? item.address_number : '') + ' ' + item.address_street + ' - ' + $filter('currency')(item.asking_price, '$').replace('.00', '') + '</p>'
              },
              click     : function(e) {
                $http.get('/property/get/' + e.id).then(
                  // success
                  function(results) {
                    if(results.data.status === 'success') {
                      try {
                        $scope.property = results.data.payload[0];
                        var panorama = GMaps.createPanorama({
                          el : '#panoramic-view',
                          lat: parseFloat($scope.property.latitude),
                          lng: parseFloat($scope.property.longitude)
                        });
                      }
                      catch(ex) {
                        // @TODO - have a standard error exception
                      }
                    }
                  },
                  // error
                  function(results) {
                    console.log('got error!');
                    console.log(results);
                  }
                );
              },
              mouseover : function(e) {

              },
              dragend   : function(e) {

              }
            });
          }
        });


        maxHeight();
        map.fitZoom();
      };

    var maxHeight = function() {
      jQuery('#map').height(jQuery(window).height() - jQuery('.navbar').height());

      jQuery(window).on('resize', function() {
        jQuery('#map').height(jQuery(window).height() - jQuery('.navbar').height());
        theMap.fitZoom();
      });
    };

    // -------------------------------------------
    // Scope Functions
    // -------------------------------------------


    // -------------------------------------------
    // Bootstrap
    // -------------------------------------------

    // start the spinner
    spinnerService.spin('main-loading');

    $scope.$watch(function() {
      return $scope.v.viewType;
    }, function(newValue, oldValue) {
      if(newValue !== oldValue) {
        if(newValue === 'MAP') {
          console.log('hit map view!');
          $scope.$emit('mapView', $scope.v.data);
        }
      }
    });

    csrfToken.then(function(data) {
      $q.all([
          // index 0
          $http.post(configuration.webservices.property.search, {
            'type'           : 'city',
            'city'           : $scope.p.city,
            'state'          : $scope.p.state,
            'country'        : $scope.p.country,
            'status_category': 'Active',
            'limit'          : 10,
            '_csrf'          : data.csrf
          })
        ]).then(function(data) {
        try {
          $scope.v.data = data[0].data.payload;
        }
        catch(ex) {
          console.error('Failed to in bulding list or map');
          console.log(ex);
        }
      });
    });


    $scope.$on('mapView', function() {

      console.log('map view fired!');
      console.log($scope.v.data);


      $timeout(function() {
        buildMap($scope.v.data);
      });

      // set the maximum height of the item
      maxHeight();
    });

  }])


  .controller('PropertyListViewCtrl', ['$scope', '$timeout', '$http', '$templateCache', '$compile', '$filter', function($scope, $timeout, $http, $templateCache, $compile, $filter) {

    // -------------------------------------------
    // Scope Variables
    // -------------------------------------------

    $scope.p = $scope.p || {};
    $scope.v = $scope.v || {};

    // pagination for list
    $scope.v.currentPage = 1;
    $scope.v.numberPerPage = 10;
    $scope.v.filteredData = [];
    $scope.v.totalItems = $scope.v.data.length;
    $scope.v.propertyDetails = {};
    $scope.v.map = null;
    $scope.v.listViewPropertyId = null;

    // -------------------------------------------
    // Private
    // -------------------------------------------

    var $previousOpenElement = null;

    var buildPagination = function() {
      var begin = (($scope.v.currentPage - 1) * $scope.v.numberPerPage),
        end = begin + $scope.v.numberPerPage;

      $scope.v.filteredData = $scope.v.data.slice(begin, end);
    };

    var maxHeight = function(targetElementId, mapElement) {
      jQuery('#' + targetElementId).height(jQuery(window).height() - jQuery('.navbar').height());

      jQuery(window).on('resize', function() {
        jQuery('#' + targetElementId).height(jQuery(window).height() - jQuery('.navbar').height());
        mapElement.fitZoom();
      });
    };

    var buildMapView = function(data) {
      $scope.v.map = new GMaps({
        el : '#map-list',
        lat: data.latitude,
        lng: data.longitude
      });

      $scope.v.map.addMarker({
        lat       : data.latitude,
        lng       : data.longitude,
        title     : data.address_number + ' ' + data.address_street,
        icon      : '/images/icons/house-icon.png',
        id        : data.id,
        infoWindow: {
          content: '<p>' + (data.address_number ? data.address_number : '') + ' ' + data.address_street + ' - ' + $filter('currency')(data.asking_price, '$').replace('.00', '') + '</p>'
        }
      });

      // make the map sticky
      jQuery("#map-list").sticky({topSpacing: 0});

      maxHeight('map-list', $scope.v.map);
    };

    // -------------------------------------------
    // Scope Functions
    // -------------------------------------------

    $scope.clickPropertyItem = function($event, propertyId) {

      $http.get('/property/photos/264396').then(
        // success
        function(results) {
          try {
            $scope.v.propertyPhotos = results.data.payload;

            console.log($scope.v.propertyPhotos);
          }
          catch(ex) {
            console.log(ex);
            return null;
          }
        },

        // error
        function(errors) {

        }
      );

      $http.get('/property/get/' + propertyId).then(
        // success
        function(results) {
          try {
            $scope.v.propertyDetails = results.data.payload[0];

            $scope.v.listViewPropertyId = $scope.v.propertyDetails.id;

            // target element parent
            var $targetParent = jQuery($event.currentTarget);

            if($previousOpenElement && ! $previousOpenElement.is($targetParent)) {
              $previousOpenElement.find('.property-details').remove();
              $previousOpenElement.find('.property-summary').show();
            }

            // find the element and change the view
            if($targetParent.find('.property-details').length < 1) {
              $targetParent.append(
                $compile($templateCache.get('templatePropertyDetails.html'))($scope)
              );
              $targetParent.find('.property-summary').hide();
            }
            else {
              $targetParent.find('.property-details').remove();
              $targetParent.find('.property-summary').show();
            }

            // save the reference
            $previousOpenElement = $targetParent;
          }
          catch(ex) {
            console.log(ex);
            return null;
          }

          // build map
          buildMapView($scope.v.propertyDetails);
        },

        // success
        function(errors) {

        }
      );
    };

    // -------------------------------------------
    // Bootstrap
    // -------------------------------------------

    $scope.$watch(function() {
      return $scope.v.currentPage;
    }, function() {
      buildPagination();
    });

    // watch for parent data change and fire the event
    $scope.$watch(function() {
      return $scope.v.data.length;
    }, function(newValue, oldValue) {
      if(newValue !== oldValue) {
        $scope.v.totalItems = newValue;
        buildPagination();
      }
    });

  }]);