/* global before, after, describe, it */
'use strict';
var should  = require( 'chai' ).should();
var sinon   = require( 'sinon' );
var request = require( 'supertest' );
var app     = require( __dirname + '/../../server.js' ).app;
var port    = 9898;
var nonTokenServer;
var indexRouterIndex = 0;

describe( 'app - with token mods', function() {
	before( function( done ) {
		nonTokenServer = app.listen( port, function( err ) {
			if( err ) {
				done( err );
			} else {
				done();
			}
		});
	});

	after( function() {
		nonTokenServer.close();
	});

	it( 'should exist', function( done ) {
		should.exist( app );
		done();
	});

	it( 'should return html index page', function( done ) {
		request( app )
			.get( '/' )
			.set( 'Accept', 'text/html' )
			.set( 'Accept', 'application/html' )
			.expect( 'Content-Type', /html/ )
			.expect( 200 )
			.end( function( err ) {
				if ( err ) {
					return done( err );
				} else {
					done();
				}
			});
	});

	it( 'should throw a 404 HTML page', function( done ) {
		request( app )
			.get( '/some-fake-route' )
			.set( 'Accept', 'text/html' )
			.expect( 'Content-Type', /html/ )
			.expect( 404 )
			.end( function( err ) {
				if( err ) {
					return done( err );
				} else {
					done();
				}
			});
	});

	it( 'should throw a 404 json blob', function( done ) {
		request( app )
			.get( '/some-fake-route' )
			.set( 'Accept', 'application/json' )
			.expect( 'Content-Type', /json/ )
			.expect( 404 )
			.end( function( err ) {
				if( err ) {
					return done( err );
				} else {
					done();
				}
			});
	});

	it( 'should throw a 500', function( done ) {
		request( app )
			.get( '/throw-err' )
			.expect( 500 )
			.end( function( err ) {
				if( err ) {
					return done( err );
				} else {
					done();
				}
			});
	});
});