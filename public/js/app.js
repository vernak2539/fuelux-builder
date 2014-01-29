'use strict';

window.app.angular = angular.module( 'fuelBuilder', [] );

window.app.angular.factory( 'BuilderData', function() {
	return {
		steps: [
			{
				desc: 'Version'
			},
			{
				desc: 'Components'
			},
			{
				desc: "CSS, LESS, or Both"
			},
			{
				desc: 'Review'
			}
		],
		options: {
			versions: [
				'2.0.0',
				'2.0.1',
				'2.0.2'
			]
		}
	};
});

window.app.angular.controller( 'stepController', function( $scope, BuilderData ) {
	$scope.builderData = BuilderData;
});