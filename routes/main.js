'use strict';

var index        = require( './index' );
var errorHandler = require( './errors' );

module.exports = {
	index: index
	, errors: {
		error404: errorHandler.error404
		, coverall: errorHandler.coverall
	}
};
