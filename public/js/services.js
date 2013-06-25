'use strict';

/* Services */

angular.module('citySensing')

angular.module('citySensing.services', [])
	
	.factory('gridService', function($http, $q) {
	  
	  return {
	    
	    getGrid : function(url){
        var deferred = $q.defer();
        $http.get(url).success(function(data){
            deferred.resolve(data);
        }).error(function(){
            deferred.reject("An error occured while fetching grid");
        });
        
        return deferred.promise;
    	}
	  }
	})

	.factory('apiService', function($http, $q) {
	  
	  return {
	    
	    getMap : function(request){
	        
	        var deferred = $q.defer();
	        $http.post("/api/map", request)
	        .then(function(response){
	            deferred.resolve(response.data);
	        },
	        function(){
	            deferred.reject("An error occured while fetching map data");
	        });
	        
	        return deferred.promise;
	    },

	    getTimelineContext : function(request){
	        
	        var deferred = $q.defer();
	        $http.post("/api/timeline/context", request)
	        .then(function(response){
	            deferred.resolve(response.data);
	        },
	        function(){
	            deferred.reject("An error occured while fetching map data");
	        });
	        
	        return deferred.promise;
	    },

	    getTimelineFocus : function(request){
	        
	        var deferred = $q.defer();
	        $http.post("/api/timeline/focus", request)
	        .then(function(response){
	            deferred.resolve(response.data);
	        },
	        function(){
	            deferred.reject("An error occured while fetching map data");
	        });
	        
	        return deferred.promise;
	    },

	    getSidePanel : function(request){
	        
	        var deferred = $q.defer();
	        $http.post("/api/sidepanel", request)
	        .then(function(response){
	            deferred.resolve(response.data);
	        },
	        function(){
	            deferred.reject("An error occured while fetching map data");
	        });
	        
	        return deferred.promise;
	    },

	    getConceptNetwork : function(request){
	        
	        var deferred = $q.defer();
	        $http.post("/api/concept/network", request)
	        .then(function(response){
	            deferred.resolve(response.data);
	        },
	        function(){
	            deferred.reject("An error occured while fetching map data");
	        });
	        
	        return deferred.promise;
	    }

	  }

	});