'use strict';

var request = require('request');
var _ = require('lodash');



//constructor  weather service from open weather map
module.exports = function openWeather(){
  var uri    = 'http://api.openweathermap.org/data/2.5/',
      params = {APPID:'cfb987a3ab170a63766cc84ed3f0af1d',
                units :'metric'};


  this.forecast = function(query,callback){
    var uriForecast = uri + 'forecast?';
    var paramsString = "";
    if (query.lat&&query.lng){
      var paramsForecast = _.merge(params,{lat:query.lat,lon:query.lng});
      paramsString = serialize(paramsForecast);
    }

    request(uriForecast+paramsString, function(err, response, body) {
      if(err ||!body) { callback(err,null); }
      try {
        var data = JSON.parse(body);
        if(data.cod=='404')  { callback(err,null); }
        callback(err,data);
      }
      catch (err){
        { callback(err,null); }
      }
    })

  }

  this.current = function(query,callback){
    var uriCurrent  = uri + 'weather?';
    var paramsString = "";
    if (query.lat&&query.lng){
      var paramsCurrent = _.merge(params,{lat:query.lat,lon:query.lng});
      paramsString = serialize(paramsCurrent);
    }
    request(uriCurrent+paramsString, function(err, response, body) {
      if(err ||!body) { callback(err,null); }
      try {
        var data = JSON.parse(body);
        if(data.cod=='404')  { callback(err,null); }
        callback(err,data);
      }
      catch (err){
        { callback(err,null); }
      }
    })

  }

}



// helper functions

function serialize(obj) {
  var str = [];
  for(var p in obj)
  if (obj.hasOwnProperty(p)) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  }
  return str.join("&");
}
