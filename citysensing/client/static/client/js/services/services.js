'use strict';

angular.module('citySensing')
.config(function($httpProvider){
	$httpProvider.defaults.headers.post['X-CSRFToken'] = csrf;
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
})

var headers = {
    'X-CSRFToken' : csrf,
    'Content-Type' : 'application/json'
}


angular.module('citySensing')
.factory('dataService', function($http, $q) {
  
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

    /* Timeline Context */
    getTimelineContext: function(request){

        var deferred = $q.defer();
        $http.post("/api/timeline/context/", request)
        .then(function(data){
            deferred.resolve(data.data.result);
        },
        function(){
            deferred.reject("An error occured while fetching timeline/context data");
        });
        
        return deferred.promise;
    },

    /* Timeline Focus */
    getTimelineFocus: function(request){

        var deferred = $q.defer();
        $http({ url: "/api/timeline/focus/", headers:headers, timeout: deferred.promise, data:request })
        .then(function(data){
            deferred.resolve(data.data.result);
        },
        function(){
            deferred.reject("An error occured while fetching timeline/context data");
        });
        return deferred.promise;
    },

    /* Side Panel */
    getSidePanel: function(request){

        var deferred = $q.defer();
        $http.post("/api/sidepanel/", request)
        .then(function(data){
            deferred.resolve(data.data.result);
        },
        function(){
            deferred.reject("An error occured while fetching sidepanel data");
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