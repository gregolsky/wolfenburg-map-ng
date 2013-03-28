'use strict';


// Declare app level module which depends on filters, and services
angular.module('wolfenburg-map', ['$strap.directives', 'wolfenburg-map.filters', 'wolfenburg-map.services', 'wolfenburg-map.directives']).
  config(['$routeProvider', function($routeProvider) {
  	$routeProvider.when('', { templateUrl: 'partials/maps.html' });
  	$routeProvider.when('/map/new', { templateUrl: 'partials/add-map.html', controller: MapController });
    $routeProvider.when('/map/:mapId', { templateUrl: 'partials/map.html', controller: MapController });
    $routeProvider.when('/map/:mapId/add/:x/:y', { templateUrl: 'partials/add-place.html', controller: AddPlaceController });
    //$routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: MyCtrl2});
    $routeProvider.otherwise({redirectTo: ''});
  }]);
