define(function(require) {
	'use strict';

	// app specific
	var app = require( 'app-base/app' );

	// VENDOR
	var Marionette = require( 'marionette' );
	var $ = require( 'jquery' );

	// views
	var FuelVersionCompositeView = require( 'views/fuel-version-composite-view' );
	//var FuelControlsView          = require( 'views/fuel-controls-view' );

	// templates
	var customizeLayoutTmpl = require( 'tmpl!templates/customize-layout-tmpl.html' );

	return Marionette.Layout.extend({
		template: customizeLayoutTmpl
		, className: 'row'
		, regions: {
			versions: '#versions'
			, controls: '#controls'
		}
		, onRender: function() {
			this.versions.show( new FuelVersionCompositeView({ collection: app.model.get( 'fuel-versions' ) }) );
			this.versions.$el.find( '.radio-custom > input[type=radio]' ).radio();
		}
	});
});
