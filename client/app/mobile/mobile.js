'use strict';

angular.module('navApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/mobile', {
        templateUrl: 'app/mobile/mobile.html',
        controller: 'MobileCtrl'
      });
  });
