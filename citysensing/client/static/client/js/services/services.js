'use strict';

angular.module('citySensing')
.config(function($httpProvider){
	$httpProvider.defaults.headers.post['X-CSRFToken'] = csrf;
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
})

angular.module('citySensing')
.factory('mapService', function($http) {
  
  return {
    
    getMapData : function(request){
        
    	var promise = $http.post("/api/map/", request)
    	.then(function(response){
            return response.data.result;
        },
        function(response){
        	console.log("error", response)
            return response.data.error;
        })
        return promise;
    }
    
    
  }
});