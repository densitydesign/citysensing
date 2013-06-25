'use strict';

/* Controllers */

angular.module('citySensing.controllers', [])
  .controller('mainCtrl', function($scope, $http, gridService) {

    // base grid for the map
    $scope.gridUrl = "grid/grid.json";
    // default initial start value
    $scope.start = 1365568200000;
    // default initial end value
    $scope.end = 1366923600000;

    gridService.getGrid($scope.gridUrl).then(
      function(data){
        $scope.grid = data;
      },
      function(error){

      }
    )

    $scope.request = {
      "cells": []
    }

    // dismiss errors
    $scope.dismiss = function(){
      $scope.error = false;
    }

  })