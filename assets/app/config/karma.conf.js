module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
      '../../assets/bower_components/angular/angular.js',
      // '../../app/lib/angular/angular-*.js',
      '../../assets/bower_components/angular-mocks/angular-mocks.js',
      '../../assets/bower_components/requirejs/require.js',
      '../../assets/bower_components/underscore/underscore-min.js',

      // 'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular-sanitize.js',
        '../../assets/bower_components/angular-ui/common/module.js',
        '../../assets/bower_components/angular-bootstrap/ui-bootstrap.js',
        '../../assets/bower_components/amcharts/amcharts.js',
        '../../assets/bower_components/amcharts/serial.js',
        '../../assets/bower_components/angular-route/angular-route.min.js',
        '../../assets/bower_components/angular-resource/angular-resource.min.js',
        '../../assets/bower_components/angular-spinner/angular-spinner.js',
        '../../assets/bower_components/angular-socket-io/socket.min.js',

      '../../assets/js/app.js',
      '../../assets/js/config-test.js',

      '../../assets/js/components/*.js',
      '../../assets/js/controllers/*.js',
      '../../assets/js/directives/*.js',
      '../../assets/js/services/*.js',
      '../../assets/js/filters/*.js',
      '../../assets/js/test/**/*.js'
    ],

    exclude : [
      'app/lib/angular/angular-loader.js',
      'app/lib/angular/*.min.js',
      'app/lib/angular/angular-scenario.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

})}
