define(function(require) {
	'use strict';

	// app stuff
	var app = require( 'app-base/app' );

	// VENDOR
	var Marionette = require( 'marionette' );


	// views
	var versionItemView = require( 'views/fuel-version-item-view' );

	// templates
	var compostieViewTmpl = require( 'tmpl!templates/fuel-version-composite-view-tmpl.html' );

	return Marionette.CompositeView.extend({
		template: compostieViewTmpl
		, itemView: versionItemView
	});
});
