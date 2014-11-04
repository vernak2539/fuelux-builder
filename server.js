'use strict';

var config  = require( 'config' );
var pkg     = require( './package.json' );
var http    = require( 'http' );
var express = require( 'express' );
var app     = express();

// express4 specific
var compression    = require( 'compression' );
var errorHandler   = require( 'errorhandler' );
var methodOverride = require( 'method-override' );
var bodyParser     = require( 'body-parser' );

// rendering engine
var ECT         = require( 'ect' );
var ectRenderer = ECT({
	watch: true
	, root: __dirname + '/views'
	, ext : '.ect'
});

var lessCompiler = require( 'express-less-middleware' )();

app.use( compression() );

app.set( 'view engine', 'ect' );
app.engine( 'ect', ectRenderer.render );

app.set( 'port',  process.env.PORT || config.port );

app.disable( 'X-Powered-By' );

// setting up dev specific things
if( process.env.NODE_ENV === 'dev' ) {

	// using less compiler
	app.use( lessCompiler() );

	// error handling dump, only in dev
	app.use( errorHandler( { dumpException: true, showStack: true } ) );
}

// bower_components
app.use( config.ui.bowerBase, express.static( __dirname + config.ui.bowerBase ) );

// everything else static if possible
app.use( express.static( __dirname + config.ui.publicDir ) );

app.use( methodOverride() );

app.use( bodyParser.urlencoded({ extended: true }) );

function start() {
	http.createServer( app ).listen( app.get( 'port' ) );
	console.log( 'Express server for '+ pkg.name +' started on port %d in %s mode', app.get( 'port' ), process.env.NODE_ENV || 'local' );
}
exports.start = start;
exports.app   = app;
