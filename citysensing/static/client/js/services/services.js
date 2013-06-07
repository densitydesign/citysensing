'use strict';

angular.module('citySensing')
.config(function($httpProvider){
	$httpProvider.defaults.headers.post['X-CSRFToken'] = csrf;
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
})


angular.module('citySensing')
.factory('mapService', function($http, $q) {
  
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
    },

    getGrid : function(gridUrl){
        var deferred = $q.defer();
        $http.get(gridUrl).success(function(data){
            deferred.resolve(data);
        }).error(function(){
            deferred.reject("An error occured while fetching grid");
        });
        
        return deferred.promise;
    }


    
    
  }
});