// initialize our faux database
var request = require('request'),
	//baseUrl = 'http://156.54.107.76:8003/0.4', //mdw
  baseUrl = 'http://156.54.107.76'
  version = '0.5'
	headers = { 'Content-type': 'application/json' };

/*
function addApi(name, url) {
  exports[name] = function (req, res) {
    request(
      {
        method : 'POST',
        url : url,
        headers : headers,
        body : JSON.stringify(req.body)
      },

      function (error, response, body) {
        if (response.statusCode == 201) {
          res.json(JSON.parse(body));
        } else res.json({'error':'error'});
      }
    )
  }
}

(function(){
  console.log("giorgio")
  addApi('map','/map');
  addApi('timelineContext','/timeline/context');
  addApi('timelineFocus','/timeline/focus');
  addApi('sidepanel','/sidepanel');
  addApi('network','/conceptnetwork');
})();
*/


exports.map = function (req, res) {
  request(
  	{
  		method : 'POST',
  		url : baseUrl + ':' + req.body.port + '/' + version + '/map',
  		headers : headers,
			body : JSON.stringify(req.body)
  	},

  	function (error, response, body) {
  		if (response.statusCode == 201) {

    		res.json(JSON.parse(body));
	  	} else res.json({'error':JSON.parse(body)});
  	}
  )
};

exports.timelineContext = function (req, res) {
  request(
  	{
  		method : 'POST',
  		url : baseUrl + ':' + req.body.port + '/' + version + '/timeline/context',
  		headers : headers,
			body : JSON.stringify(req.body)
  	},

  	function (error, response, body) {
  		if (response.statusCode == 201) {
    		res.json(JSON.parse(body));
	  	} else res.json({'error':JSON.parse(body)});
  	}
  )
};

exports.timelineFocus = function (req, res) {
  request(
  	{
  		method : 'POST',
  		url : baseUrl + ':' + req.body.port + '/' + version + '/timeline/focus',
  		headers : headers,
			body : JSON.stringify(req.body)
  	},

  	function (error, response, body) {
  		if (response.statusCode == 201) {
    		res.json(JSON.parse(body));
	  	} else res.json({'error':JSON.parse(body)});
  	}
  )
};

exports.sidepanel = function (req, res) {
  request(
  	{
  		method : 'POST',
  		url : baseUrl + ':' + req.body.port + '/' + version + '/sidepanel',
  		headers : headers,
			body : JSON.stringify(req.body)
  	},

  	function (error, response, body) {
  		if (response.statusCode == 201) {
    		res.json(JSON.parse(body));
	  	} else res.json({'error':JSON.parse(body)});
  	}
  )
};

exports.conceptNetwork = function (req, res) {
  request(
  	{
  		method : 'POST',
  		url : baseUrl + ':' + req.body.port + '/' + version + '/conceptnetwork',
  		headers : headers,
			body : JSON.stringify(req.body)
  	},

  	function (error, response, body) {
  		if (response.statusCode == 201) {
    		res.json(JSON.parse(body));
	  	} else res.json({'error':JSON.parse(body)});
  	}
  )
};

exports.conceptFlows = function (req, res) {
  request(
    {
      method : 'POST',
      url : baseUrl + ':' + req.body.port + '/' + version + '/conceptflows',
      headers : headers,
      body : JSON.stringify(req.body)
    },

    function (error, response, body) {
      if (response.statusCode == 201) {
        res.json(JSON.parse(body));
      } else res.json({'error':JSON.parse(body)});
    }
  )
};

exports.eventList = function (req, res) {
  request(
    {
      method : 'POST',
      url : baseUrl + ':' + req.body.port + '/' + version + '/eventlist',
      headers : headers,
      body : JSON.stringify(req.body)
    },

    function (error, response, body) {
      if (response.statusCode == 201) {
        res.json(JSON.parse(body));
      } else res.json({'error':JSON.parse(body)});
    }
  )
};

exports.inout = function (req, res) {
  request(
    {
      method : 'POST',
      url : baseUrl + ':' + req.body.port + '/' + version + '/inoutchart',
      headers : headers,
      body : JSON.stringify(req.body)
    },

    function (error, response, body) {
      if (response.statusCode == 201) {
        res.json(JSON.parse(body));
      } else res.json({'error':JSON.parse(body)});
    }
  )
};

exports.test = function (req, res) {
  request(
    {
      method : 'GET',
      url : 'https://graph.facebook.com/nike',
      headers : headers
    },

    function (error, response, body) {
      if (response.statusCode == 201) {
        res.json(JSON.parse(body));
      } else res.json({'error':JSON.parse(body)});
    }
  )
};

