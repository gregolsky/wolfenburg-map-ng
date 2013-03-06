
angular.module('wolfenburg-map.services', ['ngResource'])
.value('version', '0.1')
.factory('place', ['$resource',
	function($resource) {
		
		var Place = $resource('/place/:id', {
			id : '@id'
		});
	
		var service = {
			'get' : function(id) {
				return Place.get({
					"id" : id
				});
			},
			'list' : function() {
				return Place.query();
			},
			'create' : function(place) {
				var p = new Place(place);
				p.$save();
				return p;
			},
			'remove': function(id){
				return Place.remove({ 'id': id });
			}
		};
	
		return service;
}]);

