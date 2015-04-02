'use strict';

angular.module('navApp')
  .factory('Weather', function ($http) {
    // Service logic
    // ...

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
      getCurrent: function(query,callback){
        $http.get('api/weather/current?'+ serialize(query))
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
