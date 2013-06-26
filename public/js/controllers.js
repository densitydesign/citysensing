'use strict';

/* Controllers */

angular.module('citySensing.controllers', [])
  .controller('mainCtrl', function($scope, $http, gridService) {

    // base grid for the map
    $scope.gridUrl = "grid/grid.json";
    // default initial start value
    $scope.start = 1365758354716;
    // default initial end value
    $scope.end = 1365618174165;

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

    $scope.sizeList = [
      {
        label: "Mobile Anomaly",
        value: "mobily_anomaly"
      },
      {
        label: "Mobile Activity",
        value: "mobily_activity"
      }
    ]

    $scope.size = $scope.sizeList[0]


    gridService.getGrid($scope.gridUrl).then(
      function(data){
        $scope.grid = data;
      },
      function(error){

      }
    )

    $scope.request = {
      cells: []
    }

    // dismiss errors
    $scope.dismiss = function(){
      $scope.error = false;
    }

  })