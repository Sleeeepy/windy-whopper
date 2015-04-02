'use strict';

var _             = require('lodash'),
    Flight        = require('./flight.model'),
    FlightService = require('./flight.service'),
    Geo           = require('../../components/libs/Geo'),
    Airport       = require('../airport/airport.model');

// Get list of flights
exports.index = function(req, res) {
  Flight.find(function (err, flights) {
    if(err) { return handleError(res, err); }
    return res.json(200, flights);
  });
};

// Get list of flights
exports.scheduled = function(req, res) {
  var flightService = new FlightService();
  flightService.scheduledByAirport(req.query,function(err,data){
    if (err){ return handleError(res, err); }
    if(!data) { return res.send(404); }
    return res.json(data);
  });
};

// Get list of flights
exports.status = function(req, res) {
  var flightService = new FlightService();
  flightService.status(req.query,function(err,data){
    if (err){ return handleError(res, err); }
    if(!data) { return res.send(404); }
    return res.json(data);
  });
};

// Get a single flight path by endpoints
exports.getPath = function(req, res) {
  if(req.query.origin&&req.query.dest){
    Airport.findOne()
      .or([
            {'IATA': req.query.origin.toUpperCase()},
            {'IACO': req.query.origin.toUpperCase()}
          ])
      .exec(function (err, origin) {
        if(err) { return handleError(res, err); }
        Airport.findOne()
          .or([
                {'IATA': req.query.dest.toUpperCase()},
                {'IACO': req.query.dest.toUpperCase()}
              ])
          .exec(function (err, dest) {
            if(err) { return handleError(res, err); }
            try{
              var geo = new Geo(origin);
              var path = geo.pathTo(dest),
                  dist = geo.distanceTo(dest);
              return res.json(200,{dist:dist,path:path});
            }
            catch(err){return handleError(res, err);}
        });
        //return res.json(200, airports);
    });
    return;
  }
Mediobanca2

};
// Get a single flight path by ID
exports.showPath = function(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    if(err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    return res.json(flight);
  });
};

// Get a single flight
exports.show = function(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    if(err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    return res.json(flight);
  });
};

// Creates a new flight in the DB.
exports.create = function(req, res) {
  Flight.create(req.body, function(err, flight) {
    if(err) { return handleError(res, err); }
    return res.json(201, flight);
  });
};

// Updates an existing flight in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Flight.findById(req.params.id, function (err, flight) {
    if (err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    var updated = _.merge(flight, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, flight);
    });
  });
};

// Deletes a flight from the DB.
exports.destroy = function(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    if(err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    flight.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
