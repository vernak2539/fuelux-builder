/*jshint node:true*/
'use strict';

var config           = require( 'config' );
var MongoClient      = require( 'mongodb' ).MongoClient;
var mongoose         = require( 'mongoose' );
var mongoInstance    = null;
var mongooseInstance = null;
var mongoConfig;

function buildMongoConnectionString( configOpts ) {
	var connectionString = 'mongodb://';

	if( !!configOpts.user ) {
		connectionString += configOpts.user + ':';
	}

	if( !!configOpts.password ) {
		connectionString += configOpts.password + '@';
	}

	if( !!configOpts.host ) {
		connectionString += configOpts.host + ':';
	}

	if( !!configOpts.port ) {
		connectionString += configOpts.port + '/';
	}

	if( !!configOpts.dbname ) {
		connectionString += configOpts.dbname;
	}

	return connectionString;
}

var getClientInstance = function( useMongoose ) {

	// getting stackato specific env variables for mongo
	if( !!config.mongo.useVCAP && process.env.VCAP_SERVICES ) {
		mongoConfig           = JSON.parse( process.env.VCAP_SERVICES );
		mongoConfig           = mongoConfig.mongodb[0];
		config.mongo.host     = mongoConfig.credentials.host;
		config.mongo.port     = mongoConfig.credentials.port;
		config.mongo.user     = mongoConfig.credentials.username;
		config.mongo.password = mongoConfig.credentials.password;
		config.mongo.dbname   = mongoConfig.credentials.db;
	}

	config.mongo.connectionString = buildMongoConnectionString( config.mongo );

	if( !!useMongoose && !mongooseInstance ) {
		// adding message to connection on open
		mongoose.connection.on( 'open', function() {
			console.log( 'Mongoose: connection opened' );
			console.log( 'Mongoose: connection string --> ' + config.mongo.connectionString );
		});

		// adding message to connection on error
		mongoose.connection.on( 'error', function( err ) {
			console.log( 'Mongoose: ' + err );
			console.log( 'Mongoose: connection string --> ' + config.mongo.connectionString );
		});

		// connecting with mongoose to mongo
		mongooseInstance = mongoose.connect( config.mongo.connectionString );
	} else if( !mongoInstance ) {
		// connecting with plain mongo instance
		MongoClient.connect( config.mongo.connectionString, function( err, db ) {
			if( err ) {
				// displaying error message
				console.log( 'MongoDB: ' + err );
			} else {
				// storing instance
				mongoInstance = db;

				// displaying connection info
				console.log( 'MongoDB: connection opened' );
				console.log( 'MongoDB: connection string --> ' + config.mongo.connectionString );
			}
		});
	}

	if( !!useMongoose ) {
		return mongooseInstance;
	} else {
		return mongoInstance;
	}
};

module.exports = getClientInstance;