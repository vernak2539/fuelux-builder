'use strict';

var error404 = function( req, res ) { // removed next from parameters because we don't want it to continue and it was never used
	res.status( 404 );

	// respond with html page
	if( req.accepts( 'html' ) ) {
		res.render( '404', {
			errorCode: 404
			, errorMsg: 'Not Found'
			, url: req.url
		});
		return;
	}

	// respond with json
	if( req.accepts( 'json' ) ) {
		res.send( { error: '404: Not found' } );
		return;
	}

	// default to plain-text. send()
	res.type( 'txt' ).send( '404: Not found' );
};


var coverallError = function( err, req, res, next ) {
	var errorCode = err.status || 500;
	res.status( errorCode );
	res.render( '500', {
		errorCode: errorCode
		, errorMsg: 'Server Error'
	});
	next( err );
};

exports.error404 = error404;
exports.coverall = coverallError;
