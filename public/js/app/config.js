requirejs.config({
	baseUrl: '../components'
	, paths: {
		// APP Paths
		'app-base': '../js/app'
		, templates: '../client-templates'
		, js: '../js'
		, views: '../js/views'

		// VENDOR Paths
		, backbone: 'backbone/backbone'
		, underscore: 'underscore/underscore' // needed for marionette
		, jquery: 'jquery/jquery'
		, json2: 'json2/json2'
		, bootstrap: 'bootstrap/dist/js/bootstrap'
		//, fuelux: 'http://www.fuelcdn.com/fuelux/2.5.0'
		, fuelux: 'fuelux/dist/'
		, moment: 'moment/moment'
		, marionette: 'backbone.marionette/lib/core/amd/backbone.marionette'
		, 'backbone.wreqr': 'backbone.wreqr/lib/amd/backbone.wreqr'
		, 'backbone.babysitter': 'backbone.babysitter/lib/amd/backbone.babysitter'
		, tmpl: 'tmpl'
		, text: 'text'
		, handlebars: 'handlebars'
	}
	, deps: [ 'app-base/router' ]
	, shim: {
		'backbone': {
			deps: [ 'jquery', 'underscore', 'json2' ],
			exports: 'Backbone'
		},
		'jquery': {
			exports: '$'
		},
		'underscore': {
			exports: '_'
		},
		'bootstrap': {
			deps: [ 'jquery' ]
		},
		'fuelux': {
			deps: [ 'jquery' ]
		}
	}
});