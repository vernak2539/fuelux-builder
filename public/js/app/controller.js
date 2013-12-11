define(function(require) {
	'use strict';

	// app itself
	var app = require( 'app-base/app' );

	// vendor
	var Backbone = require( 'backbone' );

	// views
	var MainLayout = require( 'views/main-layout' );

	// temp data
	var fuelVersions = [
		{ version: '2.5.0', latest: true }
		, { version: '2.4.2' }
		, { version: '2.4.1' }
		, { version: '2.4.0' }
		, { version: '2.3.1' }
		, { version: '2.3.0' }
		, { version: '2.2.1' }
		, { version: '2.2.0' }
		, { version: '2.1.1' }
		, { version: '2.1.0' }
		, { version: '2.0.2' }
		, { version: '2.0.1' }
		, { version: '2.0.0' }
	];

	app.addInitializer( function() {
		this.model = new Backbone.Model();

		this.model.set({ 'fuel-versions': new Backbone.Collection( fuelVersions ) });
	});

	var controller =  {
		loadIndex: function() {
			//console.log( 'test' );
			app.main.show( new MainLayout() );
		}
	};

	return controller;
});
