// initialize our faux database
var request = require('request'),
	//baseUrl = 'http://80.18.73.38:8175/0.3',
	baseUrl = 'http://156.54.107.76:8003/0.3',
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
  		url : baseUrl + '/map',
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
  		url : baseUrl + '/timeline/context',
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
  		url : baseUrl + '/timeline/focus',
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
  		url : baseUrl + '/sidepanel',
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
  		url : baseUrl + '/conceptnetwork',
  		headers : headers,
			body : JSON.stringify(req.body)
  	},

  	function (error, response, body) {

      console.log("network?")

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
      url : baseUrl + '/conceptflows',
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
      url : baseUrl + '/eventlist',
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
  console.log("Test")
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
