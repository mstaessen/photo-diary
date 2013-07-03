'use strict';

describe('Directive: gmap', function () {
  beforeEach(module('PhotoDiaryApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<gmap></gmap>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the gmap directive');
  }));
});
