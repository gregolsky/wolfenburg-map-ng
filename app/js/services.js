
angular.module('wolfenburg-map.services', ['ngResource'])
.value('version', '0.1')
.factory('place', ['$resource',
	function($resource) {
		
		var Place = $resource('/map/:mapId/place/:id', {
			id : '@id',
			mapId: '@mapId'
		});
	
		var service = {
			'get': function(id, mapId) {
				return Place.get({
					"id" : id,
					"mapId": mapId
				});
			},
			'list': function(mapId) {
				return Place.query({
					'mapId': mapId
				});
			},
			'create': function(place) {
				var p = new Place(place);
				p.$save();
				return p;
			},
			'remove': function(id, mapId){
				return Place.remove({ 
					'id': id,
					'mapId': mapId 
				});
			}
		};
	
		return service;
}])
.factory('map', ['$resource',
 	function($resource){
  	
		var Map = $resource('/map/:id', {
			id : '@id'
		});
	
		var service = {
			'get': function(id) {
				return Map.get({
					"id" : id
				});
			},
			'list': function() {
				return Map.query();
			},
			'create': function(map, callback) {
				var m = new Map(map);
				m.$save(function(m){
					callback(m);
				});
				return m;
			},
			'remove': function(id){
				return Map.remove({ 
					'id': id
				});
			}
		};
	
		return service;  	
  	
}])

