define(function(require) {
	'use strict';

	// app itself
	var app = require( 'app-base/app' );

	// vendor files
	var Marionette = require( 'marionette' );

	// main controller for routing
	var controller = require( 'app-base/controller' );

	var Router = Marionette.AppRouter.extend({
		controller: controller
		, appRoutes: {
			'': 'loadIndex'
		}
	});

	// initializing router and starting marionette app
	app.router = new Router();
	app.start({
		router: app.router
	});
});