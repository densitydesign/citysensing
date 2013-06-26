'use strict';

/* Services */

var timelineFocus,
	sidePanel,
	mapRequest;


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
	        
	        // aborting previous requests...
	    	if (mapRequest && mapRequest.readyState != 4) {
	    		mapRequest.abort();
	    	}

	        mapRequest = $.ajax({
	        	type : 'POST',
	        	data : JSON.stringify(request),
	        	processData : false,
	        	dataType : 'json',
	        	contentType: 'application/json',
	        	url: 'api/map'
	        })

	        return mapRequest;
	    },

	    getTimelineContext : function(request){
	        
	        return $.ajax({
	        	type : 'POST',
	        	data : JSON.stringify(request),
	        	processData : false,
	        	dataType : 'json',
	        	contentType: 'application/json',
	        	url: 'api/timeline/context'
	        })
	    },

	    getTimelineFocus : function(request){
	        
	    	// aborting previous requests...
	    	if (timelineFocus && timelineFocus.readyState != 4) {
	    		timelineFocus.abort();
	    	}

	        timelineFocus = $.ajax({
	        	type : 'POST',
	        	data : JSON.stringify(request),
	        	processData : false,
	        	dataType : 'json',
	        	contentType: 'application/json',
	        	url: 'api/timeline/focus'
	        })

	        return timelineFocus;
	        
	    },

	    getSidePanel : function(request){

	        // aborting previous requests...
	    	if (sidePanel && sidePanel.readyState != 4) {
	    		sidePanel.abort();
	    	}

	        sidePanel = $.ajax({
	        	type : 'POST',
	        	data : JSON.stringify(request),
	        	processData : false,
	        	dataType : 'json',
	        	contentType: 'application/json',
	        	url: 'api/sidepanel'
	        })

	        return sidePanel;
	    },

	    getConceptNetwork : function(request){
	        
	        return $.ajax({
	        	type : 'POST',
	        	data : JSON.stringify(request),
	        	processData : false,
	        	dataType : 'json',
	        	contentType: 'application/json',
	        	url: 'api/concept/network'
	        })
	    }

	  }

	});