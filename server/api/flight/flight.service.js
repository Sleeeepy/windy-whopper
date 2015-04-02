'use strict';

var request = require('request');
var _ = require('lodash');



//constructor  weather service from open weather map
module.exports = function flighStats(){
  var uri    = 'https://api.flightstats.com/flex/schedules/rest/v1/json',
      params = {appId:'508471e1',
                appKey:'ffe89a3d1daa41357d1d4ab9879db8dd'
                //protocol:'rest',
                //format:'json'
              };

  this.scheduledByAirport = function(query,callback){
    var uriScheduled = uri +'/from/'+query.origin ;

    uriScheduled +=  '/departing/' + serializeTime(new Date());
    uriScheduled +=  '?' + serialize(params);
    //console.log(uriScheduled);
    //'https://api.flightstats.com/flex/schedules/rest/v1/json/from/LHR/departing/2015/3/31/10?appId=508471e1&appKey=ffe89a3d1daa41357d1d4ab9879db8dd';
    request(uriScheduled, function(err, response, body) {
      if(err ||!body) { callback(err,null); }
      try {
        var data = JSON.parse(body);
        //if(data.cod=='404')  { callback(err,null); }
        callback(err,data);
      }
      catch (err){
        { callback(err,null); }
      }
    })

  }

  this.status = function(query,callback){
    var uriStatus = uri +'/from/'+query.origin ;

    uriScheduled += '/departing/'+serializeTime(new Date());
    uriScheduled += '?'+serialize(params);
    //console.log(uriScheduled);
    //'https://api.flightstats.com/flex/schedules/rest/v1/json/from/LHR/departing/2015/3/31/10?appId=508471e1&appKey=ffe89a3d1daa41357d1d4ab9879db8dd';
    request(uriScheduled, function(err, response, body) {
      if(err ||!body) { callback(err,null); }
      try {
        var data = JSON.parse(body);
        //if(data.cod=='404')  { callback(err,null); }
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

function serializeTime(time) {
  //takes js Date object
  return serializeDate(time)+'/'+time.getHours();
}

function serializeDate(date){
  return date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
}
