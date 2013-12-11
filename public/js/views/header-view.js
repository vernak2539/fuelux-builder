define(function(require) {
	'use strict';

	// VENDOR
	var Marionette = require( 'marionette' );

	// template
	var headerTmpl = require( 'tmpl!templates/header-tmpl.html' );

	return Marionette.ItemView.extend({
		template: headerTmpl
	});
});
