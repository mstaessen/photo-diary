'use strict';

describe('Controller: ShootCtrl', function () {

  // load the controller's module
  beforeEach(module('PhotoDiaryApp'));

  var ShootCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShootCtrl = $controller('ShootCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
