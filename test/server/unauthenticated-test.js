/* global before, after, describe, it */
'use strict';

var should				= require( 'chai' ).should();
var request				= require( 'supertest' );
var app					= require( __dirname + '/../../server.js' ).app;
var port				= 9898;
var config				= require('config');
var fuelTokenMiddleware = require('../../lib/fuel-token-middleware')(config.fuelConfigs);
var tokenHandleIndex;
var tokenServer;

describe( 'app - no token mods', function() {
	before( function( done ) {

		app.stack.forEach(function(middleware, index){
			if(middleware.handle.name === 'session'){
				tokenHandleIndex = index + 1;
				app.stack.splice(tokenHandleIndex, 0, {
					handle: fuelTokenMiddleware,
					route: ''
				});
			}
		});

		tokenServer = app.listen( port, function( err ) {
			if( err ) {
				done( err );
			} else {
				done();
			}
		});
	});

	after( function() {
		app.stack.splice(tokenHandleIndex, 1);
		tokenServer.close();
	});

	it( 'should exist', function( done ) {
		should.exist( app );
		done();
	});

	it( 'should return unauthorized by default because of token middleware', function( done ) {
		request( app )
			.get( '/' )
			.set( 'Accept', 'application/html' )
			.set( 'Accept', 'text/html' )
			.expect( 401 )
			.end( function( err ) {
				if ( err ) {
					return done( err );
				} else {
					done();
				}
			});
	});
});