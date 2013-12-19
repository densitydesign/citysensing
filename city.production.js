
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path'),
  MBTiles = require('mbtiles');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
};


// Authenticator
var auth = express.basicAuth('citysensing', 'c1tysens1ng')

/**
 * Routes
 */

// serve index and view partials
app.get('/', auth, routes.index);
app.get('/partials/:name', routes.partials);


// JSON API
app.post('/api/map', api.map);
app.post('/api/timeline/context', api.timelineContext);
app.post('/api/timeline/focus', api.timelineFocus);
app.post('/api/sidepanel', api.sidepanel);
app.post('/api/concept/network', api.conceptNetwork);
app.post('/api/concept/flows', api.conceptFlows);
app.post('/api/eventlist', api.eventList);
app.post('/api/inout', api.inout);
app.post('/api/test', api.test);

// UTF grid service

var mbtilesLocation = __dirname + '/public/grid/citysensing.mbtiles';

new MBTiles(mbtilesLocation, function(err, mbtiles) {
  if (err) throw err;
  app.get('/tiles/:z/:x/:y.*', function(req, res) {
    var extension = req.param(0);
    switch (extension) {
      case "png": {
        mbtiles.getTile(req.param('z'), req.param('x'), req.param('y'), function(err, tile, headers) {
          if (err) {
            res.status(404).send('Tile rendering error: ' + err + '\n');
          } else {
            res.header("Content-Type", "image/png")
            res.send(tile);
          }
        });
        break;
      }
      case "grid.json": {
        mbtiles.getGrid(req.param('z'), req.param('x'), req.param('y'), function(err, grid, headers) {
          if (err) {
            res.status(404).send('Grid rendering error: ' + err + '\n');
          } else {
            res.header("Content-Type", "text/json")
            res.send(grid);
          }
        });
        break;
      }
    }
  });
	// redirect all others to the index (HTML5 history)
	app.get('*', routes.index);
});




/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
