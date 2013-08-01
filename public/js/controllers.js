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

    $scope.anomalyExponent = 10;

    $scope.showMap = true;

    $scope.request = {
      start: 1365469200000,
      end: 1366182000000,
      cells: []
    }

    $scope.areas = [
      { name: "Brera Design District", cells: [6054, 5954, 5854, 5754, 6055, 5955, 5855, 5755, 6056, 5956, 5856, 5756, 6057, 5957, 5857, 5757, 6058, 5958, 5858, 5758, 6059, 5959, 5859, 5759, 6060, 5960, 5860, 5760]},
      { name: "Zona Tortona", cells: [5246, 5146, 5046, 4946, 4846, 5247, 5147, 5047, 4947, 4847, 5248, 5148, 5048, 4948, 4848, 5249, 5149, 5049, 4949, 4849]},
      { name: "Lambrate Ventura", cells: [7960, 7860, 7760, 7660, 7560, 7961, 7861, 7761, 7661, 7561, 7962, 7862, 7762, 7662, 7562, 7963, 7863, 7763, 7663, 7563]},
      { name: "Università degli Studi", cells: [6349, 6249, 6149, 6049, 6350, 6250, 6150, 6050, 6351, 6251, 6151, 6051]},
      { name: "Centro", cells: [6352, 6252, 6152, 6052, 5952, 5852, 5752, 6353, 6253, 6153, 6053, 5953, 5853, 5753]},
      { name: "Porta Venezia", cells: [6956, 6856, 6756, 6656, 6556, 6456, 6356, 6256, 6156, 6957, 6857, 6757, 6657, 6557, 6457, 6357, 6257, 6157, 6958, 6858, 6758, 6658, 6558, 6458, 6358, 6258, 6158, 6959, 6859, 6759, 6659, 6559, 6459, 6359, 6259, 6159, 6960, 6860, 6760, 6660, 6560, 6460, 6360, 6260, 6160]},
      { name: "Porta Romana", cells: [6745, 6645, 6545, 6445, 6345, 6245, 6145, 6045, 6746, 6646, 6546, 6446, 6346, 6246, 6146, 6046, 6747, 6647, 6547, 6447, 6347, 6247, 6147, 6047, 6748, 6648, 6548, 6448, 6348, 6248, 6148, 6048]},
      { name: "Museo della Scienza", cells: [5451, 5351, 5452, 5352]},
      { name: "Triennale", cells: [5654, 5554, 5454, 5354, 5254, 5655, 5555, 5455, 5355, 5255, 5656, 5556, 5456, 5356, 5256, 5657, 5557, 5457, 5357, 5257, 5658, 5558, 5458, 5358, 5258, 5659, 5559, 5459, 5359, 5259, 5660, 5560, 5460, 5360, 5260]}
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