require.config({
	paths : {
		angular: 'vendor/angular.min',
        jquery: 'vendor/jquery',
        domReady: 'vendor/require/domReady',
        twitter: 'vendor/bootstrap',
        angularResource: 'vendor/angular-resource.min'
	},
	shim : {
		'twitter/js/bootstrap': {
          deps: ['jquery/jquery']
		}, angular: {
         deps: [ 'jquery/jquery',
                 'twitter/js/bootstrap'],
         exports: 'angular'
       },
       angularResource: { deps:['angular'] }
	}
});