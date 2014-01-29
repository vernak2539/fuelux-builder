'use strict';

var indexController = require( './index' );
var errorHandler = require( './errors' );

module.exports = function( server ) {
	// add more controllers here and the app will automatically pick up the new routes
	indexController( server );
	errorHandler( server );
};