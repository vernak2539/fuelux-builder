'use strict';

var config  = require( 'config' );
var pkg     = require( './package.json' );
var http    = require( 'http' );
var express = require( 'express' );
var appsec  = require( 'lusca' );
var app     = express();

// express handlebars setup
var exphbs    = require( 'express3-handlebars' );
var hbsConfig = require( './lib/hbs-config' );
var hbs       = exphbs.create( hbsConfig );

// getting main controller for routes
var mainController = require( './controllers/main' );

// adding custom middleweare
var lessCompiler = require( 'express-less-middleware' )();

app.configure( function() {
	// Webfonts need mime types, too!
	express.static.mime.define( { 'application/x-font-woff': [ 'woff' ] } );
	express.static.mime.define( { 'application/x-font-ttf': [ 'ttf' ] } );
	express.static.mime.define( { 'application/vnd.ms-fontobject': [ 'eot' ] } );
	express.static.mime.define( { 'font/opentype': [ 'otf' ] } );
	express.static.mime.define( { 'image/svg+xml': [ 'svg' ] } );

	// gzipping
	app.use( express.compress() );

	// setting port correctly
	app.set( 'port', process.env.PORT || config.port );

	// using express3 handlebars for templating
	app.engine( 'handlebars', hbs.engine );
	app.set( 'view engine', 'handlebars' );
	app.set( 'views', __dirname + '/views/' );

	// serving front-facing app from static place
	// include before any middleware unnecessary for static files
	app.use( express.static( __dirname + config.ui.publicDir ) );

	// allowing express to behave like a RESTful app
	app.use( express.methodOverride() );
	app.use( express.cookieParser() );

	app.use( function ( req, res, next ) {
		app.disable( 'X-Powered-By' );
		res.setHeader( "X-Powered-By", "ExactTarget" );
		next();
	});

	// use express session middleware
	// for multi-instance apps MemoryStore should be replaced
	// with a cross instance store such as RedisStore
	app.use( express.session({
		store: new express.session.MemoryStore()
		, secret: 'test-build-for-filesSecret!@#$4424'
		, key: 'test-build-for-files379Key'
	} ) );

	// app security configuration
	app.use( appsec({
		csrf: true,
		xframe: 'SAMEORIGIN'
	}));
});

app.configure( 'dev', function() {
	console.log( 'Running '+ pkg.name +' in dev mode' );
	app.use( lessCompiler );
	app.use( express.errorHandler( { dumpException: true, showStack: true } ) );
});

app.configure( 'prod', function() {
	console.log( 'Running '+ pkg.name +' in production mode' );
});

// configuring routes here. edit inside ./controllers/main.js to add routes
mainController( app );

// using router middleware
app.use( app.router );

function start() {
	http.createServer( app ).listen( app.get( 'port' ) );
	console.log( 'Express server for '+ pkg.name +' started on port %d in %s mode', app.get( 'port' ), process.env.NODE_ENV || 'local' );
}
exports.start = start;
exports.app   = app;
