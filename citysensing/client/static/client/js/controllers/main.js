'use strict';

angular.module('citySensing')
  .controller('main', function($scope, $http, mapService) {

/*  	var options = Restangular.all('options');

  	options.getList().then(function(options){
      console.log(options)
    })

    $scope.time = {
      start = "asdasd",
      end = "sadasdas"
    }

    
    $scope.$watch('time', function(){
      cells.
    })
  	
  	 
    /*
    $http.jsonp("http://localhost:8000/api/options?callback=JSON_CALLBACK")
        .success(function(data){
        	console.log(data)
          $scope.authors = data.result.options;
        })
        .error(function(data,status){
        	console.log(data,status)
        });
*/
  

  $scope.$watch('start',function(){
    // fare tutte quelle cose che devono acccadere quando start cambia...

  })

  var request = {
    "start": 1365568200000,
    "end": 1366923600000,
    "cells": [
        9080,
        4356,
        4763,
        7835,
        6543,
        2098,
        456
    ]
  }
  
  mapService.getMapData(request).then(
    function(data){
        console.log(data)
    }, 
    function(error){
      console.error("error getting map data", error);
    }
  );

  $scope.grid = "static/client/grid/grid_t.json";
  $scope.start = 30;
  $scope.end = 100;



  })