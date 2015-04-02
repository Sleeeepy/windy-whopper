'use strict';

describe('Service: Airport', function () {

  // load the service's module
  beforeEach(module('navApp'));

  // instantiate service
  var Airport;
  beforeEach(inject(function (_Airport_) {
    Airport = _Airport_;
  }));

  it('should do something', function () {
    expect(!!Airport).toBe(true);
  });

});
