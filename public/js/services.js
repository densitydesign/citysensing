'use strict';

/* Services */

var focusRequest,
	contextRequest,
	sidePanelRequest,
	eventListRequest,
	mapRequest,
	networkRequest,
	flowRequest,
	flowRequestTwo;

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

	.factory('apiService', function($http, $q, $rootScope) {
	  
	  return {
	    
	    getMap : function(request){
	        
	        // aborting previous requests...
	    	if (mapRequest && mapRequest.readyState != 4) {
	    		mapRequest.abort();
	    		$rootScope.$broadcast("loading", false);
	    	}

	        mapRequest = $.ajax({
	        	type : 'POST',
	        	data : JSON.stringify(request),
	        	processData : false,
	        //	dataType : 'json',
	        	contentType: 'application/json',
	        	url: 'api/map',
	        	beforeSend: function(){ $rootScope.$broadcast("loading", true); }
	        })
	        .done(function(){ $rootScope.$broadcast("loading", false); })
	        return mapRequest;
	    },

	    getEventList : function(request){
	        
	        // aborting previous requests...
	    	if (eventListRequest && eventListRequest.readyState != 4) {
	    		eventListRequest.abort();
	    		$rootScope.$broadcast("loading", false);
	    	}

	        eventListRequest = $.ajax({
	        	type : 'POST',
	        	data : JSON.stringify(request),
	        	processData : false,
	        //	dataType : 'json',
	        	contentType: 'application/json',
	        	url: 'api/eventlist',
	        	beforeSend: function(){ $rootScope.$broadcast("loading", true); }
	        })
	        .done(function(){ $rootScope.$broadcast("loading", false); })

	        return eventListRequest;
	    },

	    getTimelineContext : function(request){
	        
	        // aborting previous requests...
	    	if (contextRequest && contextRequest.readyState != 4) {
	    		contextRequest.abort();
	    		$rootScope.$broadcast("loading", false);
	    	}

	    	contextRequest = $.ajax({
	        	type : 'POST',
	        	data : JSON.stringify(request),
	        	processData : false,
	        //	dataType : 'json',
	        	contentType: 'application/json',
	        	url: 'api/timeline/context',
	        	beforeSend: function(){ $rootScope.$broadcast("loading", true); }
	        })
	        .done(function(){ $rootScope.$broadcast("loading", false); })

	        return contextRequest;
	    },

	    getTimelineFocus : function(request){
	        
	    	// aborting previous requests...
	    	if (focusRequest && focusRequest.readyState != 4) {
	    		focusRequest.abort();
	    		$rootScope.$broadcast("loading", false);
	    	}

	        focusRequest = $.ajax({
	        	type : 'POST',
	        	data : JSON.stringify(request),
	        	processData : false,
	        //	dataType : 'json',
	        	contentType: 'application/json',
	        	url: 'api/timeline/focus',
	        	beforeSend: function(){ $rootScope.$broadcast("loading", true); }
	        })
	        .done(function(){ $rootScope.$broadcast("loading", false); })

	        return focusRequest;
	        
	    },

	    getSidePanel : function(request){

	        // aborting previous requests...
	    	if (sidePanelRequest && sidePanelRequest.readyState != 4) {
	    		sidePanelRequest.abort();
	    		$rootScope.$broadcast("loading", false);
	    	}

	        sidePanelRequest = $.ajax({
	        	type : 'POST',
	        	data : JSON.stringify(request),
	        	processData : false,
	        //	dataType : 'json',
	        	contentType: 'application/json',
	        	url: 'api/sidepanel',
	        	beforeSend: function(){ $rootScope.$broadcast("loading", true); }
	        })
	        .done(function(){ $rootScope.$broadcast("loading", false); })

	        return sidePanelRequest;
	    },

	    getConceptNetwork : function(request){
	        
	        // aborting previous requests...
	    	if (networkRequest && networkRequest.readyState != 4) {
	    		networkRequest.abort();
	    		$rootScope.$broadcast("loading", false);
	    	}

	        networkRequest = $.ajax({
	        	type : 'POST',
	        	data : JSON.stringify(request),
	        	processData : false,
	        //	dataType : 'json',
	        	contentType: 'application/json',
	        	url: 'api/concept/network',
	        	beforeSend: function(){ $rootScope.$broadcast("loading", true); }
	        })
	        .done(function(){ $rootScope.$broadcast("loading", false); })

	        return networkRequest;
	    },

	    getConceptFlows : function(request){

	    	// aborting previous requests...
	    	if (flowRequest && flowRequest.readyState != 4) {
	    		flowRequest.abort();
	    		$rootScope.$broadcast("loading", false);
	    	}

	        flowRequest = $.ajax({
	        	type : 'POST',
	        	data : JSON.stringify(request),
	        	processData : false,
	        //	dataType : 'json',
	        	contentType: 'application/json',
	        	url: 'api/concept/flows',
	        	beforeSend: function(){ $rootScope.$broadcast("loading", true); }
	        })
	        .done(function(){ $rootScope.$broadcast("loading", false); })

	        return flowRequest;
	        
	    },

	    getConceptFlowsTwo : function(request){

	    	// aborting previous requests...
	    	if (flowRequestTwo && flowRequestTwo.readyState != 4) {
	    		flowRequestTwo.abort();
	    		$rootScope.$broadcast("loading", false);
	    	}

	        flowRequestTwo = $.ajax({
	        	type : 'POST',
	        	data : JSON.stringify(request),
	        	processData : false,
	        //	dataType : 'json',
	        	contentType: 'application/json',
	        	url: 'api/concept/flows',
	        	beforeSend: function(){ $rootScope.$broadcast("loading", true); }
	        })
	        .done(function(){ $rootScope.$broadcast("loading", false); })

	        return flowRequestTwo;
	        
	    }


	  }

	});