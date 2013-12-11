define(function(require) {
	'use strict';

	// app itself
	var app = require( 'app-base/app' );

	var controller =  {
		loadIndex: function() {
			console.log( 'test' );
			//app.main.show( new CalendarLayout() );
		}
	};

	return controller;
});
