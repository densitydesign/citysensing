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
        
        var deferred = $q.defer();
        $http.post("/api/map/", request)
        .then(function(data){
            deferred.resolve(data.data.result);
        },
        function(){
            deferred.reject("An error occured while fetching map data");
        });
        
        return deferred.promise;
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