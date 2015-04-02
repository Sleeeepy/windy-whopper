'use strict';

angular.module('navApp')
  .factory('Flight', function ($http) {
    // Service logic
    function serialize(obj) {
        var str = [];
        for(var p in obj)
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
    }

    // Public API here

    return {
      getScheduled: function(query,callback){
        console.log('api/flights/scheduled?'+ serialize(query));
        $http.get('api/flights/scheduled?'+ serialize(query))
            .success(function(data,status,hearders,config){
                callback(data);
              })
            .error(function(data, status, headers, config) {
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
        });

      },
      getForecast: function(query,callback){
        $http.get('api/weather/forecast?'+ serialize(query))
            .success(function(data,status,hearders,config){
                callback(data);
              })
            .error(function(data, status, headers, config) {
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
        });

      }
    };

  });
