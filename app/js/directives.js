'use strict';

/* Directives */


angular.module('wolfenburg-map.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
