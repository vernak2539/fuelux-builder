'use strict';

var config = require( 'config' );
var _      = require( 'underscore' );

var defaultOptions = {
	title: 'Fuel UX Builder',
	ui: JSON.stringify( config.ui ),
	index: '{{$index+1}}',
	stepDesc: '{{step.desc}}'
};

module.exports = function( server ) {
	server.get( '/', function( req, res ) {
		res.render( 'index', _.extend( defaultOptions, { csrfToken: req.csrfToken() } ) );
	});
};