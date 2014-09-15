'use strict';

/* global angular, _, chart, AmCharts */

angular.module('DojoApp.directives')
    .directive('hdAmcharts', ['$window', '$compile', '$timeout', '$sce', 'chartTypesAndInfo', '$http', '$templateCache', '$modal', 'messageBus', 'configuration', function(
                               $window,   $compile,   $timeout,   $sce,   chartTypesAndInfo,   $http,   $templateCache,   $modal,   messageBus,   configuration) {

        return {
            replace: true,
            scope  : {
                data          : '=graphData',
                country       : '=',
                state         : '=',
                city          : '=',
                propertyType  : '=',
                graphTitle    : '@',
                id            : '@id',
                title         : '@',
                type          : '@',
                width         : '@',
                height        : '@',
                xAxis         : '@',
                yAxis         : '@',
                showWidgetCode: '=',
                graphOutput   : '@',
                trendLineData : '=trendLineData',
                yAxisPrefix   : '@yAxisPrefix',

                // amChart settings
                amChart       : '=',
                amTrendLine   : '=',
                amValueAxis   : '=',
                amBallon      : '=',
                amGraph       : '=',
                amCursor      : '=',

                // data table settings
                showTable     : '=',
                tableHeaders  : '=',
                tableData     : '=',
                tableSettings : '='
            },
            templateUrl: 'amchartTemplate.html',
            link: function (scope, element) {

                if (chartTypesAndInfo[scope.graphOutput] &&
                    chartTypesAndInfo[scope.graphOutput].chart_type_description) {
                    scope.textDescription = chartTypesAndInfo[scope.graphOutput].chart_type_description;
                }

                scope.defaultGraphWidth  = scope.width        || null;
                scope.defaultHeight      = scope.height       || '450px';
                scope.defaultTableWidth  = scope.tableWidth   || null;
                scope.defaultTableHeight = scope.tableHeight  || '450px';
                scope.chartId            = 'chart-' + (Math.floor(Math.random() * 1000) + 1);
                scope.tableId            = scope.chartId.replace('chart-', 'table-');

                // get the widget code
                $http.get('/js/views/partials/widgetCode.html', {cache: $templateCache})
                    .then(
                        // success
                        function(results) {
                            scope.widgetCodeText = results.data;
                        },

                        // errors
                        function(errors) {
                            messageBus.add('alert', 'Failed to get the tempalte');
                        }
                    );

                // watch the window width
                scope.$watch(function() { return element[0].offsetWidth; }, function() {

//                    if (! (scope.defaultGraphWidth && scope.defaultGraphWidth > 0) && scope.width && scope.height) {
//                        scope.height = ((newWidth / parseInt(scope.width.replace('px', ''))) * parseInt(scope.height.replace('px', ''))) +'px';
//                        scope.width = scope.defaultGraphWidth || element[0].offsetWidth;
//                        scope.width += 'px';
//                        scope.height = ((newWidth / scope.width) * scope.height) +'px';
//                    }
//                    else {
//                        scope.width = scope.defaultGraphWidth || element[0].offsetWidth +'px';
//                        scope.height = scope.defaultHeight;
//                    }

//                    scope.width = '100%';
                    scope.render();
                });

                // watch the change of graph data
                scope.$watch(function() { return scope.data; }, function() {
                    scope.render();
                });

                // watch the resize event
                $window.onresize = function(){
                    scope.$apply();
                };

                // function to render the chart
                scope.render = function() {

                    // amChart standard objects;
                    var chart        = new AmCharts.AmSerialChart(),
                        categoryAxis = chart.categoryAxis,
                        valueAxis    = new AmCharts.ValueAxis(),
                        graph        = new AmCharts.AmGraph(),
                        trendLine    = scope.trendLineData ? new AmCharts.TrendLine() : null,
                        chartCursor  = new AmCharts.ChartCursor();

                    // format to AmChart data format
                    var chartData = [];
                    for(var key in scope.data) {
                        if (scope.data.hasOwnProperty(key)) {
                            chartData.push({
                                year: key,
                                value: scope.data[key]
                            });
                        }
                    }

                    // chart.pathToImages = "http://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/SteacieLibrary.jpg/110px-SteacieLibrary.jpg";
                    chart.dataProvider   = chartData;
                    chart.dataDateFormat = "YYYY-MM";
                    chart.categoryField  = "year";
                    chart.color          = '#555555';
                    chart.depth3D        = 30;
                    chart.angle          = 40;

                    // category axis
                    categoryAxis.parseDates       = true; // as our data is date-based, we set parseDates to true
                    categoryAxis.minPeriod        = "MM"; // our data is daily, so we set minPeriod to DD
                    categoryAxis.axisAlpha        = 0.8;
                    categoryAxis.minorGridEnabled = false;
                    categoryAxis.inside           = false;
                    categoryAxis.usePrefixes      = true;
                    categoryAxis.dashLength       = 0;

                    // value axis
                    valueAxis.title             = (scope.yAxis) ? scope.yAxis : null;
                    valueAxis.tickLength        = 3;
                    valueAxis.gridAlpha         = 0.05;
                    valueAxis.axisAlpha         = 0.8;
                    valueAxis.showFirstLabel    = true;
                    valueAxis.showLastLabel     = true;
                    valueAxis.unit              = (scope.xAxis) ? scope.xAxis : null;
                    valueAxis.unitPosition      = 'left';

                    // graph
                    graph.type                  = "smoothedLine";
                    graph.lineColor             = "#2d8dc4";
                    graph.fillColorsField       = "lineColor";
                    graph.fillAlphas            = 0.3;
                    graph.valueField            = "value";
                    graph.bullet                = "round";
                    graph.balloonText           = "[[category]]<br><b><span style='font-size:14px;'>"+ ((scope.yAxisPrefix) ? scope.yAxisPrefix : '') +"[[value]]</span></b>";
                    graph.bulletBorderColor     = "#057AD6";
                    graph.bulletBorderAlpha     = 0.7;
                    graph.bulletBorderThickness = 2;
                    graph.bulletColor           = '#22abbf';
                    graph.bulletSize            = 10;
                    graph.borderAlpha           = 0.5;
                    graph.lineThickness         = 2;
                    graph.fillColors            = ["#D4ECFC", "#057AD6"];

                    // check and see whether trendline is set
                    if (scope.trendLineData) {
                        // set the default trend line settings
                        var keys               = _.keys(scope.trendLineData);
                        trendLine.initialDate  = keys[0];
                        trendLine.finalDate    = keys[keys.length - 1];
                        trendLine.initialValue = scope.trendLineData[keys[0]];
                        trendLine.finalValue   = scope.trendLineData[keys[keys.length - 1]];
                    }

                    // apply directive tags settings
                    var tagProperties = [
                        {
                            'object'    : chart,
                            'tagElement': scope.amChart
                        },
                        {
                            'object'    : trendLine,
                            'tagElement': scope.amTrendLine
                        },
                        {
                            'object'    : graph,
                            'tagElement': scope.amGraph
                        },
                        {
                            'object'    : valueAxis,
                            'tagElement': scope.valueAxis
                        },
                        {
                            'object'    : chartCursor,
                            'tagElement': scope.amCursor
                        }
                    ];

                    angular.forEach(tagProperties, function(itemX, key) {
                        if (itemX.object && itemX.tagElement) {
                            angular.forEach(itemX.tagElement, function(itemY, key) {
                                itemX.object[key] = itemY;
                            });
                        }
                    });

                    // bootstrap
                    if (valueAxis)   { chart.addValueAxis(valueAxis);     }
                    if (trendLine)   { chart.addTrendLine(trendLine);     }
                    if (graph)       { chart.addGraph(graph);             }
                    if (chartCursor) { chart.addChartCursor(chartCursor); }

                    // wait for the object to be alive
                    $timeout(function() {
                        chart.write(scope.chartId);
                    }, 100);
                };

                // widget code
                scope.getWidget = function($event) {
                    $modal.open({
                        templateUrl: '/js/views/partials/modals/widgetCode.html',
                        controller: 'ModalWidgetCodController',
                        scope: scope,
                        resolve: {
                            'modalData': function() {
                                return {
                                    widgetCode: _.template(scope.widgetCodeText)({
                                        'baseUrl'     : configuration.baseUrl,
                                        'city'        : scope.city,
                                        'state'       : scope.state,
                                        'country'     : scope.country,
                                        'graphOutput' : scope.graphOutput,
                                        'propertyType': scope.propertyType
                                    })
                                };
                            }
                        }
                    });
                };
            }
        };

    }]);