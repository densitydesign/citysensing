'use strict';

/* Controllers */

angular.module('citySensing.controllers', [])
  .controller('mainCtrl', function($scope, $http, gridService, apiService, $rootScope) {

    // base grid for the map
    $scope.gridUrl = "grid/grid.json";
    // default initial start value
    $scope.star = 1365469200000;
    // default initial end value
    $scope.end = 1366182000000;

    $scope.colorList = [
      {
        label: "Social Sentiment",
        value: "social_sentiment"
      },
      {
        label: "Social Activity",
        value: "social_activity"
      }
    ]

    $scope.color = $scope.colorList[0]

    $scope.chooseColor = function(color) {
      $scope.color = color;
    }

    $scope.sizeList = [
      {
        label: "Mobile Activity",
        value: "mobily_activity"
      },
      {
        label: "Mobile Anomaly",
        value: "mobily_anomaly"
      }
    ]

    $scope.size = $scope.sizeList[0]

    $scope.chooseSize = function(size) {
      $scope.size = size;
    }

    gridService.getGrid($scope.gridUrl).then(
      function(data){
        $scope.grid = data;
      },
      function(error){

      }
    )

    $scope.anomalyExponent = 10;

    $scope.showMap = true;

    $scope.request = {
      start: 1365469200000,
      end: 1366182000000,
      cells: []
    }

    // dismiss errors
    $scope.dismiss = function(){
      $scope.error = false;
    }

  })