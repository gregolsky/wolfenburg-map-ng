'use strict';

/* Directives */

angular.module('wolfenburg-map.directives', []).directive('appVersion', ['version',
function(version) {
	return function(scope, elm, attrs) {
		elm.text(version);
	};
}]).directive('mapMarkerRef', [
function() {
	return function(scope, elm, attrs) {

		attrs.$observe('mapMarkerRef', function(value) {
			elm.bind('mouseover', function() {
				$('.map div.mark[data-place-id=' + value + ']').addClass('mark-active');
			})

			elm.bind('mouseout', function() {
				$('.map div.mark[data-place-id=' + value + ']').removeClass('mark-active');
			});
		});
	};
}]);
