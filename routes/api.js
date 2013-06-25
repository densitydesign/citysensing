// initialize our faux database
var request = require('request'),
	baseUrl = 'http://80.18.73.38:8175/0.3',
	//baseUrl = 'http://156.54.107.76:8003/0.3',
	headers = { 'content-type': 'text/json' };

exports.map = function (req, res) {
  request(
  	{
  		method : 'POST',
  		url : baseUrl + '/map',
  		headers : headers,
			body : JSON.stringify(req.body)
  	},

  	function (error, response, body) {
  		if (response.statusCode == 201) {
    		res.json(JSON.parse(body));
	  	} else res.json({'error':'error'});
  	}
  )
};

exports.timelineContext = function (req, res) {
  request(
  	{
  		method : 'POST',
  		url : baseUrl + '/timeline/context',
  		headers : headers,
			body : JSON.stringify(req.body)
  	},

  	function (error, response, body) {
  		if (response.statusCode == 201) {
    		res.json(JSON.parse(body));
	  	} else res.json({'error':'error'});
  	}
  )
};

exports.timelineFocus = function (req, res) {
  request(
  	{
  		method : 'POST',
  		url : baseUrl + '/timeline/focus',
  		headers : headers,
			body : JSON.stringify(req.body)
  	},

  	function (error, response, body) {
  		if (response.statusCode == 201) {
    		res.json(JSON.parse(body));
	  	} else res.json({'error':'error'});
  	}
  )
};

exports.sidepanel = function (req, res) {
  request(
  	{
  		method : 'POST',
  		url : baseUrl + '/sidepanel',
  		headers : headers,
			body : JSON.stringify(req.body)
  	},

  	function (error, response, body) {
  		if (response.statusCode == 201) {
    		res.json(JSON.parse(body));
	  	} else res.json({'error':'error'});
  	}
  )
};

exports.conceptNetwork = function (req, res) {
  request(
  	{
  		method : 'POST',
  		url : baseUrl + '/conceptnetwork',
  		headers : headers,
			body : JSON.stringify(req.body)
  	},

  	function (error, response, body) {
  		if (response.statusCode == 201) {
    		res.json(JSON.parse(body));
	  	} else res.json({'error':'error'});
  	}
  )
};
