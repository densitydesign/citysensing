'use strict';

angular.module('citySensing')
  .controller('main', function($scope, $http, Restangular) {

  	var options = Restangular.all('options');

  	console.log(options.getList());

    $http.post("http://156.54.107.76:8003/map", {})
        .success(function(data){
          console.log("giorgio", data)
        })
        .error(function(data,status){
          console.log(data,status)
        });
  	
  	$http.jsonp("http://localhost:8000/api/options?callback=JSON_CALLBACK")
        .success(function(data){
        	console.log(data)
          $scope.authors = data.result.options;
        })
        .error(function(data,status){
        	console.log(data,status)
        });
  })