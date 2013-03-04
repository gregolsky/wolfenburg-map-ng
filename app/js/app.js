'use strict';


// Declare app level module which depends on filters, and services
angular.module('wolfenburg-map', ['$strap.directives', 'wolfenburg-map.filters', 'wolfenburg-map.services', 'wolfenburg-map.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/map', { templateUrl: 'partials/map.html', controller: MapController });
    $routeProvider.when('/add/:x/:y', { templateUrl: 'partials/add.html', controller: AddPlaceController });
    //$routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: MyCtrl2});
    $routeProvider.otherwise({redirectTo: '/map'});
  }]);
