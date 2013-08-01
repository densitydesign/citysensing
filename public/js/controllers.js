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
        value: "social_sentiment",
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

    $scope.colors = {
      social_sentiment : "#F0965B",
      social_activity : "#F0965B",
      mobily_activity : "#6CC5F0",
      mobily_anomaly : "#6CC5F0"
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

    $scope.anomalyColumnName = "anomaly_index";

    $scope.updateColumnName = function(){
      if (!$scope.anomalyColumnName || $scope.anomalyColumnName == "") return;
      $scope.request.anomalyColumnName = $scope.anomalyColumnName;
    }

    $scope.exponent = $scope.anomalyExponent = 10;

    $scope.updateExponent = function(){
      if (!$scope.exponent || $scope.exponent == "") return;
      $scope.anomalyExponent = $scope.exponent;
    }


    $scope.showMap = true;

    $scope.request = {
      start: 1365469200000,
      end: 1366182000000,
      cells: []
    }



    $scope.areas = [
      {name: "Brera Design District", cells : [5858, 5859, 5860, 5861, 5758, 5759, 5760, 5761, 5658, 5659, 5660, 5661, 5558, 5559, 5560, 5561, 5458, 5459, 5460, 5461, 5358, 5359, 5360, 5361, 5258, 5259, 5260, 5261]},
      {name: "Zona Tortona", cells : [4749, 4750, 4751, 4752, 4753, 4649, 4650, 4651, 4652, 4653, 4549, 4550, 4551, 4552, 4553, 4449, 4450, 4451, 4452, 4453]},
      {name: "Lambrate Ventura", cells : [6176, 6177, 6178, 6179, 6180, 6076, 6077, 6078, 6079, 6080, 5976, 5977, 5978, 5979, 5980, 5876, 5877, 5878, 5879, 5880]},
      {name: "Università degli Studi", cells : [4961, 4962, 4963, 4964, 4861, 4862, 4863, 4864, 4761, 4762, 4763, 4764]},
      {name: "Centro", cells : [5158, 5159, 5160, 5161, 5162, 5163, 5164, 5058, 5059, 5060, 5061, 5062, 5063, 5064]},
      {name: "Porta Venezia", cells : [5862, 5863, 5864, 5865, 5866, 5867, 5868, 5869, 5870, 5762, 5763, 5764, 5765, 5766, 5767, 5768, 5769, 5770, 5662, 5663, 5664, 5665, 5666, 5667, 5668, 5669, 5670, 5562, 5563, 5564, 5565, 5566, 5567, 5568, 5569, 5570, 5462, 5463, 5464, 5465, 5466, 5467, 5468, 5469, 5470]},
      {name: "Porta Romana", cells : [4661, 4662, 4663, 4664, 4665, 4666, 4667, 4668, 4561, 4562, 4563, 4564, 4565, 4566, 4567, 4568, 4461, 4462, 4463, 4464, 4465, 4466, 4467, 4468, 4361, 4362, 4363, 4364, 4365, 4366, 4367, 4368]},
      {name: "Museo della Scienza", cells : [5054, 5055, 4954, 4955]},
      {name: "Triennale", cells : [5853, 5854, 5855, 5856, 5857, 5753, 5754, 5755, 5756, 5757, 5653, 5654, 5655, 5656, 5657, 5553, 5554, 5555, 5556, 5557, 5453, 5454, 5455, 5456, 5457, 5353, 5354, 5355, 5356, 5357, 5253, 5254, 5255, 5256, 5257]}
    ]

    // dismiss errors
    $scope.dismiss = function(){
      $scope.error = false;
    }

    $scope.clearSelection = function(){
      $scope.request.cells = [];
      $scope.request.start = $scope.star;
      $scope.request.end = $scope.end;
    }


  })