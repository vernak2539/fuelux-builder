define(function(require) {
	'use strict';

	// VENDOR
	var Marionette = require( 'marionette' );

	// templates
	var componentsTmpl = require( 'tmpl!templates/fuel-component-tmpl.html' );

	return Marionette.ItemView.extend({
		template: componentsTmpl
	});
});
