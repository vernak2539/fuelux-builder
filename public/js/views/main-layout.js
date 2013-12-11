define(function(require) {
	'use strict';

	// VENDOR
	var Marionette = require( 'marionette' );

	// fuel stuff
	var FuelRadio = require( 'fuelux/radio' );

	// views
	var HeaderView      = require( 'views/header-view' );
	var CustomizeLayout = require( 'views/customize-layout' );

	// TEMPLATES
	var templateName = require( 'tmpl!templates/main-layout-tmpl.html' );

	return Marionette.Layout.extend({
		template: templateName
		, regions: {
			header: '#header'
			, content: '#content'
		}
		, onRender: function() {
			this.header.show( new HeaderView() );
			this.content.show( new CustomizeLayout() );
		}
	});
});
