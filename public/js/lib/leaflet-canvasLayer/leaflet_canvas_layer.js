/**
 * full canvas layer implementation for Leaflet
 */

L.CanvasLayer = L.Class.extend({

  includes: [L.Mixin.Events, L.Mixin.TileLoader],

  options: {
      minZoom: 0,
      maxZoom: 28,
      tileSize: 256,
      subdomains: 'abc',
      errorTileUrl: '',
      attribution: '',
      zoomOffset: 0,
      opacity: 1,
      unloadInvisibleTiles: L.Browser.mobile,
      updateWhenIdle: L.Browser.mobile,
      oldPoint: new L.Point(0,0),
      tileLoader: false // installs tile loading events
  },

  initialize: function (options) { 
    var self = this;
    //this.project = this._project.bind(this);
    this.render = this.render.bind(this);
    L.Util.setOptions(this, options);
    this._canvas = document.createElement('canvas');
    this._ctx = this._canvas.getContext('2d');
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    this.requestAnimationFrame = requestAnimationFrame;
  },

  onAdd: function (map) {
    this._map = map;
    this._staticPane = map._createPane('leaflet-tile-pane', map._container);
    this._staticPane.appendChild(this._canvas);

    this._oldPoint = L.DomUtil.getPosition(map.getPanes().mapPane);
    var setPosition = function(){
      
      var point = L.DomUtil.getPosition(map.getPanes().mapPane).subtract(this._oldPoint);
      L.DomUtil.setPosition(this._staticPane, point);
 
    }

   map.on({
      'moveend': this._reset
    }, this);

   map.on({
      'move': setPosition
    }, this);  

    map.on('zoomanim', this._animateZoom, this);

    if(this.options.tileLoader) {
      this._initTileLoader();
    }

    this._reset();
  },

  getCanvas: function() {
    return this._canvas;
  },

  draw: function() {
    return this._reset();
  },

  onRemove: function (map) {
    map._container.removeChild(this._staticPane);
    map.off({
        'viewreset': this._reset,
        'moveend': this._reset
    }, this);
  },

  addTo: function (map) {
    map.addLayer(this);
    return this;
  },

  setOpacity: function (opacity) {
    this.options.opacity = opacity;
    this._updateOpacity();
    return this;
  },

  bringToFront: function () {
    return this;
  },

  bringToBack: function () {
    return this;
  },

  _reset: function () {

    this._oldPoint = L.DomUtil.getPosition(this._map.getPanes().mapPane);
    
    var size = this._map.getSize();
    this._canvas.width = size.x;
    this._canvas.height = size.y;
    L.DomUtil.setPosition(this._staticPane, new L.Point(0,0));
    this.onResize();
    this._render();

  },

  /*
  _project: function(x) {
    var point = this._map.latLngToLayerPoint(new L.LatLng(x[1], x[0]));
    return [point.x, point.y];
  },
  */
  _oldPoint: function(oldPoint){
    this.options.oldPoint = oldPoint;
    return this;
  },

  _updateOpacity: function () { 

    L.DomUtil.setOpacity(this._canvas, this.options.opacity)
  },

  _render: function() {
    //if (this._map._panTransition && this._map._panTransition._inProgress) { return; }
    //this.requestAnimationFrame.call(window, this.render);
    this.render()
  },

  redraw: function() {
    this._render();
  },

  onResize: function() {
  },

  render: function() {
    throw new Error('render function should be implemented');
  },
 _animateZoom: function (e) {
        var map = this._map,
            scale = map.getZoomScale(e.zoom),
            point = L.DomUtil.getPosition(map.getPanes().mapPane).subtract(this._oldPoint);

        this._staticPane.style[L.DomUtil.TRANSFORM] = L.DomUtil.getScaleString(scale, point);
  }

});
