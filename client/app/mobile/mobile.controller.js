'use strict';

angular.module('navApp')
.controller('MobileCtrl', function ($scope,Airport,Weather,Flight) {
  $scope.query="";
  $scope.selection="";
  $scope.visible =false;
  //var geo = {type:"Point",coordinates:[-0.12,51]};
  $scope.weather = {};


  if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
          $scope.myLocation = {lng:position.coords.longitude, lat:position.coords.latitude};
          var nearAirports = Airport.query({lat:$scope.myLocation.lat,lng:$scope.myLocation.lng, maxdist:70});
          $scope.airports = nearAirports;

        });
    } else {
        alert("Geolocation is not supported by this browser.");
        $scope.myLocation = {lat:51,lng:0};
        var nearAirports = Airport.query({lat:$scope.myLocation.lat,lng:$scope.myLocation.lng, maxdist:70});
        $scope.airports = nearAirports;
    }

  $scope.getWeather = function(airport){
    if(airport){
      $scope.selection = airport;
      var coord = airport.geo.coordinates;
      var query = {lng:coord[0],lat:coord[1]};
      $scope.visible = true;
      Weather.getCurrent(query,function(data){
        $scope.weather = data;
      });
      Weather.getForecast(query,function(data){
        $scope.forecast = data;
      });
      $scope.getSchedule(airport);
    }
  };
  $scope.alert = function(msg){
      alert(msg.flightNumber);
  };
  $scope.getSchedule = function(airport){

    if(airport){
      $scope.selection = airport;
      var query = {origin:airport.IATA};
      $scope.visible = true;
      Flight.getScheduled(query,function(data){
        $scope.departures = data;
      });
    }
  };

  $scope.getAirports  = function(){
    if ($scope.query.length<3){
      $scope.airports = nearAirports;
    }else
    {
      var query = {search:$scope.query};
      $scope.airports = Airport.query(query);
    };
  }

  $scope.getWeather();
});
