'use strict';

var dependencyData =  require( '../static-data/dependency-data' );

module.exports = function (server) {

	server.get('/', function (req, res) {
		var model = { config: JSON.stringify( dependencyData ) };
		res.render('index', model );
	});

};
