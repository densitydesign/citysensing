'use strict';

angular.module('citySensing')
  .controller('main', function($scope, $http) {

  // base grid for the map
  $scope.gridUrl = "static/client/grid/grid_t.json";
  // default initial start value
  $scope.start = 1365568200000;
  // default initial end value
  $scope.end = 1366923600000;

  $scope.request = {
    "cells": []
  }

/*
  mapService.getMapData(request).then(
    function(data){
      $scope.cells = data.cells;
    }, 
    function(error){
      $scope.error = error;
      console.log($scope.error)
    }
  );


  mapService.getGrid($scope.gridUrl).then(
    function(data){
      console.log($scope.grid)
    }, 
    function(error){
      $scope.error = error;
    }
  );

  */

  

  // dismiss errors
  $scope.dismiss = function(){
    $scope.error = false;
  }
  

  })