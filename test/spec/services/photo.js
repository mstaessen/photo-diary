'use strict';

describe('Service: photo', function () {

  // load the service's module
  beforeEach(module('PhotoDiaryApp'));

  // instantiate service
  var photo;
  beforeEach(inject(function (_photo_) {
    photo = _photo_;
  }));

  it('should do something', function () {
    expect(!!photo).toBe(true);
  });

});
