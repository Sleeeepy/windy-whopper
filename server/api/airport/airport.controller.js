'use strict';

var _ = require('lodash');
var Airport = require('./airport.model');

// Get list of airports
exports.indexOLD = function(req, res) {

  //search matching value on multiple fields
  if(req.query.search){
    var value = req.query.search;
    var regex = new RegExp('(^|-|\\s)'+value, "i");
    Airport.find()
      .or([
            {'IATA': value.toUpperCase()},
            {'IACO': value.toUpperCase()},
            {name  : regex},
            {city  : regex}
          ])
      .select('name IATA IACO geo city')
      .limit(20)
      .exec(function (err, airports) {
        if(err) { return handleError(res, err); }
        return res.json(200, airports);
    });
    return;
  }

  //get all airports within 150km or maxdist as specified
  else if (req.query.lng && req.query.lat){
    var maxDist = (req.query.maxdist ? req.query.maxdist : 150)*1000;
    Airport.find(
      //use $geoWithin operator for alternative sort order
      { geo: { $near:   {type: 'Point', coordinates:[req.query.lng, req.query.lat] },
                        $maxDistance: maxDist}
      })
      .select('name IATA IACO geo city')
      .exec(function (err, airports) {
        if(err) { return handleError(res, err); }
        return res.json(200,{results:airports.length,data: airports});
      });
      return;

  }
  //strict query based on query params
  else{
    Airport.find(req.query,function (err, airports) {
      if(err) { return handleError(res, err); }
      return res.json(200, airports);
    });
  }
};

// Get list of airports based on req query
exports.index = function(req, res) {

  // google style search on multiple fields
  if(req.query.search){
    var value = req.query.search,
        regex = new RegExp('(^|-|\\s)'+value, "i"),
        query = {$or:[
                      {'IATA': value.toUpperCase()},
                      {'IACO': value.toUpperCase()},
                      {name  : regex},
                      {city  : regex}
                    ]
                };
  }
  //get all airports within 150km or maxdist if specified
  else if (req.query.lng && req.query.lat){
    var maxDist = (req.query.maxdist ? req.query.maxdist : 150)*1000,
        query = { geo: { $near:   {type: 'Point', coordinates:[req.query.lng, req.query.lat] },
                        $maxDistance: maxDist}
                };//note: use $geoWithin operator for alternative sort order
  }
  //default strict query based on req query params
  else{ var query = req.query; }

  Airport.find(query)
        .limit(20)
        //.select('name IATA IACO geo city country')
        .exec(function (err, airports) {
            if(err) { return handleError(res, err); }
            return res.json(200, airports);
          });

};

// Get a single airport based on ID
exports.show = function(req, res) {
  Airport.findById(req.params.id, function (err, airport) {
    if(err) { return handleError(res, err); }
    if(!airport) { return res.send(404); }
    return res.json(airport);
  });
};

// Creates a new airport in the DB.
exports.create = function(req, res) {
  Airport.create(req.body, function(err, airport) {
    if(err) { return handleError(res, err); }
    return res.json(201, airport);
  });
};

// Updates an existing airport in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Airport.findById(req.params.id, function (err, airport) {
    if (err) { return handleError(res, err); }
    if(!airport) { return res.send(404); }
    var updated = _.merge(airport, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, airport);
    });
  });
};

// Deletes a airport from the DB.
exports.destroy = function(req, res) {
  Airport.findById(req.params.id, function (err, airport) {
    if(err) { return handleError(res, err); }
    if(!airport) { return res.send(404); }
    airport.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
