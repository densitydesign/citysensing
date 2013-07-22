'use strict';

/* Filters */

angular.module('citySensing.filters', []).

	filter('truncate', function () {
		return function (text, length, end) {
			if(!text) return;
	    /*if (isNaN(length))
	        length = 12;

	    if (end === undefined)
	        end = "";

	    if (text.length <= length || text.length - end.length <= length) {
	        return text;
	    }
	    else {
	        return String(text).substring(0, length-end.length) + end;
	    }*/
	    return parseFloat(text).toFixed(7);
		}
	})

	.filter('titleCase', function () {
		return function (str) {
			return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		}
	})

	.filter('toDate', function () {
		return function (unix) {
			var format = d3.time.format("%d/%m/%Y"),
					date = new Date(unix);
			return format(date);//str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		}
	})

	.filter('toDateTime', function () {
		return function (unix) {
			var format = d3.time.format("%c"),
					date = new Date(unix);
			return format(date);//str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		}
	});