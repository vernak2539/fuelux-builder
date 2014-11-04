'use strict';

var express = require( 'express' );
var router = express.Router();

router.get( '/', function( req, res ) {
	res.render( 'index', { title: 'Fuel UX Builder' } );
});

module.exports = router;
