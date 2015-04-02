'use strict';

describe('Service: Flight', function () {

  // load the service's module
  beforeEach(module('navApp'));

  // instantiate service
  var Flight;
  beforeEach(inject(function (_Flight_) {
    Flight = _Flight_;
  }));

  it('should do something', function () {
    expect(!!Flight).toBe(true);
  });

});
