'use strict';

var _ = require('lodash');
var Weather = require('./weather.model');
var openWeather = require('./weather.service');






// Get list of weathers
exports.index = function(req, res) {
  Weather.find(function (err, weathers) {
    if(err) { return handleError(res, err); }
    return res.json(200, weathers);
  });
};

//Get latest weather information
exports.current = function(req, res) {
  var weatherService = new openWeather();
  weatherService.current(req.query,function(err,data){
    if (err){ return handleError(res, err); }
    if(!data) { return res.send(404); }
    return res.json(data);
  });
};

//Get latest weather information
exports.forecast = function(req, res) {
  var weatherService = new openWeather();

  weatherService.forecast(req.query,function(err,data){
    //console.log(data);
    if (err){ return handleError(res, err); }
    if(!data)  { return res.send(404); }
    return res.json(data);
  });

  /*
  Weather.find(function (err, weathers) {
  if(err) { return handleError(res, err); }
  return res.json(200, {b:[222]});
});
*/
};


// Get a single weather
exports.show = function(req, res) {
  Weather.findById(req.params.id, function (err, weather) {
    if(err) { return handleError(res, err); }
    if(!weather) { return res.send(404); }
    return res.json(weather);
  });
};

// Creates a new weather in the DB.
exports.create = function(req, res) {
  Weather.create(req.body, function(err, weather) {
    if(err) { return handleError(res, err); }
    return res.json(201, weather);
  });
};

// Updates an existing weather in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Weather.findById(req.params.id, function (err, weather) {
    if (err) { return handleError(res, err); }
    if(!weather) { return res.send(404); }
    var updated = _.merge(weather, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, weather);
    });
  });
};

// Deletes a weather from the DB.
exports.destroy = function(req, res) {
  Weather.findById(req.params.id, function (err, weather) {
    if(err) { return handleError(res, err); }
    if(!weather) { return res.send(404); }
    weather.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
