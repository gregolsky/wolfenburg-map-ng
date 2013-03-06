'use strict';

function AppController($scope, place){
	$scope.places = place.list();
	
	$scope.$on('places-changed', function(){
		$scope.places = place.list();
	});
}

AppController.$inject = ['$scope', 'place'];


function MapController($scope, $location){
	
	$scope.mapClicked = function(e){
		var x = e.pageX;
		var y = e.pageY;
		
		var target = e.currentTarget;
		var mapContainer = $(target).parent('.map')[0];
		x -= mapContainer.offsetLeft + 10;
		y -= mapContainer.offsetTop + 20;
		
		var xPerc = x / target.width;
		var yPerc = y / target.height; 
		$location.path('/add/' + xPerc*100 + '/' + yPerc*100);
	};
	
}

MapController.$inject = ['$scope', '$location'];


function PlacesController($scope, place){
	
	$scope.removePlace = function(placeId){
		place.remove(placeId);	
		$scope.$emit('places-changed');
	};
}

PlacesController.$inject = ['$scope', 'place'];


function AddPlaceController($scope, $routeParams, $location, place){
	
	$scope.icon = null;
	
	$scope.setIcon = function(icon){
		$scope.icon = icon;
	}
	
	$scope.icons = [
		'icon-beer', 
		'icon-food', 
		'icon-magic', 
		'icon-plus-sign', 
		'icon-money', 
		'icon-envelope', 
		'icon-bolt', 
		'icon-fire', 
		'icon-eye-open', 
		'icon-umbrella', 
		'icon-trash', 
		'icon-group', 
		'icon-heart',
		'icon-home',
		'icon-twitter',
		'icon-beaker'];
		
	$scope.savePlace = function(){
		var coords = [ $routeParams['x'], $routeParams['y'] ];
		var data = { name: $scope.name, coords: coords, icon: $scope.icon, desc: $scope.desc };
		var p = place.create(data);
		$scope.$emit('places-changed');
		$location.path('/');
	};
	
}

AddPlaceController.$inject = ['$scope', '$routeParams', '$location', 'place'];
