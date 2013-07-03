'use strict';

describe('Directive: back', function () {
  beforeEach(module('PhotoDiaryApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<back></back>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the back directive');
  }));
});
