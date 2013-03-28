'use strict';

function AppController($scope, map) {
	$scope.maps = map.list();
}

AppController.$inject = ['$scope', 'map'];

function MapController($scope, $location, $routeParams, map) {

	$scope.map = map.get($routeParams['mapId']);

	$scope.$on('places-changed', function() {
		$scope.map = map.get($scope.map.id);
	});

	$scope.mapClicked = function(e) {
		var x = e.pageX;
		var y = e.pageY;

		var target = e.currentTarget;
		var mapContainer = $(target).parent('.map')[0];
		x -= mapContainer.offsetLeft + 10;
		y -= mapContainer.offsetTop + 20;

		var xPerc = x / target.width;
		var yPerc = y / target.height;
		$location.path('/map/' + $scope.map.id + '/add/' + xPerc * 100 + '/' + yPerc * 100);
	};

}

MapController.$inject = ['$scope', '$location', '$routeParams', 'map'];

function PlacesController($scope, place) {

	$scope.removePlace = function(placeId) {
		place.remove(placeId, $scope.map.id);
		$scope.$emit('places-changed');
	};
}

PlacesController.$inject = ['$scope', 'place'];

function AddPlaceController($scope, $routeParams, $location, place) {

	$scope.icon = null;

	$scope.setIcon = function(icon) {
		$scope.icon = icon;
	}

	$scope.icons = ['icon-beer', 'icon-food', 'icon-magic', 'icon-plus-sign', 'icon-money', 'icon-envelope', 'icon-bolt', 'icon-fire', 'icon-eye-open', 'icon-umbrella', 'icon-trash', 'icon-group', 'icon-heart', 'icon-home', 'icon-twitter', 'icon-beaker'];

	$scope.savePlace = function() {
		var mapId = $routeParams['mapId'];
		var coords = [$routeParams['x'], $routeParams['y']];
		var data = {
			mapId : mapId,
			name : $scope.name,
			coords : coords,
			icon : $scope.icon,
			desc : $scope.desc
		};
		var p = place.create(data);
		$scope.$emit('places-changed');
		$location.path('/map/' + mapId);
	};

}

AddPlaceController.$inject = ['$scope', '$routeParams', '$location', 'place'];

function AddMapController($scope, $location, map) {
	$scope.saveMap = function() {
		var data = {
			name : $scope.name,
			img : $scope.img,
			desc : $scope.desc
		};
		map.create(data, function(m) {
			$location.path('/map/' + m.id);
		});
	};
}

AddMapController.$inject = ['$scope', '$location', 'map'];
