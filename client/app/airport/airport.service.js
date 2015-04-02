'use strict';

angular.module('navApp')
  .factory('Airport', function ($resource) {
    // Service logic
    // ...



    // Public API here

    return $resource('api/airports/:id');
  });
