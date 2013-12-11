define(function(require) {
	'use strict';

	// template
	var versionItemViewTmpl = require( 'tmpl!templates/fuel-version-itemview.html' );

	// VENDOR
	var Marionette = require( 'marionette' );

	return Marionette.ItemView.extend({
		template: versionItemViewTmpl
		, tagName: 'label'
		, className: 'radio radio-custom'
	});
});
