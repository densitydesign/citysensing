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

  // mapService.getMapData(request).then(
  //   function(data){
  //       $scope.cells = data.cells;
  //   }, 
  //   function(error){
  //     console.error("error getting map data", error);
  //   }
  // );
  

  $scope.gridUrl = "static/client/grid/grid_t.json";
  mapService.getGrid($scope.gridUrl).then(
          function(data){
              $scope.grid = data;
              //console.log($scope.grid)
          }, 
          function(error){
              console.error("error getting specs list", error);
          }
      );


  $scope.start = 30;
  $scope.end = 100;

  //fake data...to be removed
  $scope.cells = [
        {
            "id": 1,
            "mobily_activity": 16,
            "mobily_anomaly": 56,
            "social_activity": 90,
            "social_sentiment": 61
        },
        {
            "id": 2222,
            "mobily_activity": 77,
            "mobily_anomaly": 9,
            "social_activity": 28,
            "social_sentiment": 0
        },
        {
            "id": 1289,
            "mobily_activity": 7,
            "mobily_anomaly": 58,
            "social_activity": 46,
            "social_sentiment": 94
        },
        {
            "id": 9447,
            "mobily_activity": 0,
            "mobily_anomaly": 55,
            "social_activity": 55,
            "social_sentiment": 95
        },
        {
            "id": 7053,
            "mobily_activity": 28,
            "mobily_anomaly": 54,
            "social_activity": 84,
            "social_sentiment": 34
        },
        {
            "id": 4955,
            "mobily_activity": 91,
            "mobily_anomaly": 33,
            "social_activity": 22,
            "social_sentiment": 5
        },
        {
            "id": 6667,
            "mobily_activity": 91,
            "mobily_anomaly": 78,
            "social_activity": 28,
            "social_sentiment": 3
        },
        {
            "id": 1621,
            "mobily_activity": 91,
            "mobily_anomaly": 63,
            "social_activity": 13,
            "social_sentiment": 34
        },
        {
            "id": 7074,
            "mobily_activity": 16,
            "mobily_anomaly": 24,
            "social_activity": 72,
            "social_sentiment": 71
        },
        {
            "id": 5148,
            "mobily_activity": 17,
            "mobily_anomaly": 67,
            "social_activity": 91,
            "social_sentiment": 45
        },
        {
            "id": 4484,
            "mobily_activity": 66,
            "mobily_anomaly": 94,
            "social_activity": 36,
            "social_sentiment": 53
        },
        {
            "id": 9508,
            "mobily_activity": 69,
            "mobily_anomaly": 10,
            "social_activity": 58,
            "social_sentiment": 24
        },
        {
            "id": 645,
            "mobily_activity": 15,
            "mobily_anomaly": 65,
            "social_activity": 49,
            "social_sentiment": 2
        },
        {
            "id": 9226,
            "mobily_activity": 63,
            "mobily_anomaly": 61,
            "social_activity": 85,
            "social_sentiment": 67
        },
        {
            "id": 9876,
            "mobily_activity": 43,
            "mobily_anomaly": 15,
            "social_activity": 8,
            "social_sentiment": 39
        },
        {
            "id": 70,
            "mobily_activity": 42,
            "mobily_anomaly": 91,
            "social_activity": 95,
            "social_sentiment": 78
        },
        {
            "id": 4007,
            "mobily_activity": 16,
            "mobily_anomaly": 80,
            "social_activity": 17,
            "social_sentiment": 53
        },
        {
            "id": 1828,
            "mobily_activity": 32,
            "mobily_anomaly": 48,
            "social_activity": 97,
            "social_sentiment": 56
        },
        {
            "id": 8486,
            "mobily_activity": 91,
            "mobily_anomaly": 9,
            "social_activity": 18,
            "social_sentiment": 43
        },
        {
            "id": 3264,
            "mobily_activity": 6,
            "mobily_anomaly": 74,
            "social_activity": 26,
            "social_sentiment": 64
        },
        {
            "id": 1393,
            "mobily_activity": 27,
            "mobily_anomaly": 33,
            "social_activity": 15,
            "social_sentiment": 65
        },
        {
            "id": 482,
            "mobily_activity": 95,
            "mobily_anomaly": 56,
            "social_activity": 35,
            "social_sentiment": 51
        },
        {
            "id": 1320,
            "mobily_activity": 51,
            "mobily_anomaly": 3,
            "social_activity": 87,
            "social_sentiment": 28
        },
        {
            "id": 6815,
            "mobily_activity": 32,
            "mobily_anomaly": 41,
            "social_activity": 27,
            "social_sentiment": 51
        },
        {
            "id": 6587,
            "mobily_activity": 0,
            "mobily_anomaly": 32,
            "social_activity": 40,
            "social_sentiment": 75
        },
        {
            "id": 1078,
            "mobily_activity": 63,
            "mobily_anomaly": 57,
            "social_activity": 88,
            "social_sentiment": 73
        },
        {
            "id": 2112,
            "mobily_activity": 13,
            "mobily_anomaly": 89,
            "social_activity": 50,
            "social_sentiment": 45
        },
        {
            "id": 233,
            "mobily_activity": 61,
            "mobily_anomaly": 41,
            "social_activity": 65,
            "social_sentiment": 37
        },
        {
            "id": 7641,
            "mobily_activity": 25,
            "mobily_anomaly": 27,
            "social_activity": 32,
            "social_sentiment": 43
        },
        {
            "id": 5195,
            "mobily_activity": 79,
            "mobily_anomaly": 91,
            "social_activity": 82,
            "social_sentiment": 5
        },
        {
            "id": 9547,
            "mobily_activity": 37,
            "mobily_anomaly": 100,
            "social_activity": 47,
            "social_sentiment": 54
        },
        {
            "id": 683,
            "mobily_activity": 60,
            "mobily_anomaly": 34,
            "social_activity": 79,
            "social_sentiment": 14
        },
        {
            "id": 3214,
            "mobily_activity": 14,
            "mobily_anomaly": 81,
            "social_activity": 42,
            "social_sentiment": 85
        },
        {
            "id": 2787,
            "mobily_activity": 35,
            "mobily_anomaly": 65,
            "social_activity": 42,
            "social_sentiment": 95
        },
        {
            "id": 7812,
            "mobily_activity": 15,
            "mobily_anomaly": 31,
            "social_activity": 45,
            "social_sentiment": 9
        },
        {
            "id": 144,
            "mobily_activity": 76,
            "mobily_anomaly": 34,
            "social_activity": 12,
            "social_sentiment": 9
        },
        {
            "id": 5299,
            "mobily_activity": 86,
            "mobily_anomaly": 87,
            "social_activity": 16,
            "social_sentiment": 27
        },
        {
            "id": 1246,
            "mobily_activity": 54,
            "mobily_anomaly": 21,
            "social_activity": 61,
            "social_sentiment": 36
        },
        {
            "id": 1515,
            "mobily_activity": 11,
            "mobily_anomaly": 41,
            "social_activity": 56,
            "social_sentiment": 47
        },
        {
            "id": 1910,
            "mobily_activity": 84,
            "mobily_anomaly": 38,
            "social_activity": 55,
            "social_sentiment": 43
        },
        {
            "id": 8438,
            "mobily_activity": 12,
            "mobily_anomaly": 19,
            "social_activity": 33,
            "social_sentiment": 26
        },
        {
            "id": 7733,
            "mobily_activity": 20,
            "mobily_anomaly": 38,
            "social_activity": 73,
            "social_sentiment": 64
        },
        {
            "id": 108,
            "mobily_activity": 63,
            "mobily_anomaly": 31,
            "social_activity": 83,
            "social_sentiment": 93
        },
        {
            "id": 827,
            "mobily_activity": 1,
            "mobily_anomaly": 50,
            "social_activity": 10,
            "social_sentiment": 40
        },
        {
            "id": 3013,
            "mobily_activity": 63,
            "mobily_anomaly": 55,
            "social_activity": 5,
            "social_sentiment": 22
        },
        {
            "id": 9611,
            "mobily_activity": 16,
            "mobily_anomaly": 30,
            "social_activity": 61,
            "social_sentiment": 59
        },
        {
            "id": 2425,
            "mobily_activity": 80,
            "mobily_anomaly": 46,
            "social_activity": 98,
            "social_sentiment": 54
        },
        {
            "id": 7095,
            "mobily_activity": 63,
            "mobily_anomaly": 23,
            "social_activity": 35,
            "social_sentiment": 61
        },
        {
            "id": 7776,
            "mobily_activity": 8,
            "mobily_anomaly": 64,
            "social_activity": 29,
            "social_sentiment": 39
        },
        {
            "id": 2163,
            "mobily_activity": 21,
            "mobily_anomaly": 63,
            "social_activity": 26,
            "social_sentiment": 15
        },
        {
            "id": 3319,
            "mobily_activity": 1,
            "mobily_anomaly": 89,
            "social_activity": 38,
            "social_sentiment": 66
        },
        {
            "id": 8296,
            "mobily_activity": 92,
            "mobily_anomaly": 11,
            "social_activity": 13,
            "social_sentiment": 99
        },
        {
            "id": 2743,
            "mobily_activity": 16,
            "mobily_anomaly": 35,
            "social_activity": 50,
            "social_sentiment": 31
        },
        {
            "id": 9374,
            "mobily_activity": 14,
            "mobily_anomaly": 59,
            "social_activity": 68,
            "social_sentiment": 22
        },
        {
            "id": 9301,
            "mobily_activity": 40,
            "mobily_anomaly": 36,
            "social_activity": 68,
            "social_sentiment": 96
        },
        {
            "id": 2616,
            "mobily_activity": 10,
            "mobily_anomaly": 90,
            "social_activity": 78,
            "social_sentiment": 39
        },
        {
            "id": 9116,
            "mobily_activity": 58,
            "mobily_anomaly": 71,
            "social_activity": 95,
            "social_sentiment": 6
        },
        {
            "id": 7085,
            "mobily_activity": 66,
            "mobily_anomaly": 55,
            "social_activity": 46,
            "social_sentiment": 78
        },
        {
            "id": 5156,
            "mobily_activity": 67,
            "mobily_anomaly": 51,
            "social_activity": 94,
            "social_sentiment": 10
        },
        {
            "id": 484,
            "mobily_activity": 44,
            "mobily_anomaly": 70,
            "social_activity": 48,
            "social_sentiment": 6
        },
        {
            "id": 8943,
            "mobily_activity": 78,
            "mobily_anomaly": 82,
            "social_activity": 35,
            "social_sentiment": 9
        },
        {
            "id": 9267,
            "mobily_activity": 12,
            "mobily_anomaly": 41,
            "social_activity": 9,
            "social_sentiment": 67
        },
        {
            "id": 6301,
            "mobily_activity": 36,
            "mobily_anomaly": 34,
            "social_activity": 59,
            "social_sentiment": 59
        },
        {
            "id": 1418,
            "mobily_activity": 78,
            "mobily_anomaly": 10,
            "social_activity": 18,
            "social_sentiment": 96
        },
        {
            "id": 4619,
            "mobily_activity": 71,
            "mobily_anomaly": 63,
            "social_activity": 97,
            "social_sentiment": 52
        },
        {
            "id": 37,
            "mobily_activity": 80,
            "mobily_anomaly": 13,
            "social_activity": 25,
            "social_sentiment": 79
        },
        {
            "id": 5004,
            "mobily_activity": 17,
            "mobily_anomaly": 75,
            "social_activity": 65,
            "social_sentiment": 86
        },
        {
            "id": 2539,
            "mobily_activity": 91,
            "mobily_anomaly": 76,
            "social_activity": 47,
            "social_sentiment": 96
        },
        {
            "id": 5621,
            "mobily_activity": 35,
            "mobily_anomaly": 43,
            "social_activity": 37,
            "social_sentiment": 75
        },
        {
            "id": 9276,
            "mobily_activity": 90,
            "mobily_anomaly": 24,
            "social_activity": 31,
            "social_sentiment": 67
        },
        {
            "id": 5028,
            "mobily_activity": 0,
            "mobily_anomaly": 89,
            "social_activity": 17,
            "social_sentiment": 1
        },
        {
            "id": 3933,
            "mobily_activity": 9,
            "mobily_anomaly": 54,
            "social_activity": 77,
            "social_sentiment": 58
        },
        {
            "id": 9079,
            "mobily_activity": 16,
            "mobily_anomaly": 81,
            "social_activity": 85,
            "social_sentiment": 20
        },
        {
            "id": 2450,
            "mobily_activity": 71,
            "mobily_anomaly": 82,
            "social_activity": 37,
            "social_sentiment": 41
        },
        {
            "id": 7735,
            "mobily_activity": 89,
            "mobily_anomaly": 42,
            "social_activity": 79,
            "social_sentiment": 75
        },
        {
            "id": 9274,
            "mobily_activity": 32,
            "mobily_anomaly": 70,
            "social_activity": 20,
            "social_sentiment": 68
        },
        {
            "id": 6726,
            "mobily_activity": 38,
            "mobily_anomaly": 92,
            "social_activity": 52,
            "social_sentiment": 56
        },
        {
            "id": 5965,
            "mobily_activity": 40,
            "mobily_anomaly": 46,
            "social_activity": 43,
            "social_sentiment": 10
        },
        {
            "id": 6351,
            "mobily_activity": 7,
            "mobily_anomaly": 8,
            "social_activity": 4,
            "social_sentiment": 66
        },
        {
            "id": 7963,
            "mobily_activity": 46,
            "mobily_anomaly": 25,
            "social_activity": 27,
            "social_sentiment": 81
        }
    ];


  })