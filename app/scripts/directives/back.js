'use strict';

angular.module('PhotoDiaryApp')
    .directive('back', function ($location, $window) {
        return {
            template: '<a class="btn btn-primary navbar-btn" ng-click="back()" ng-show="canGoBack()"><span class="glyphicon glyphicon-chevron-left"></span></a>',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                scope.canGoBack = function() {
                    return $location.path() !== '/' && $window.history.length > 0;
                };

                scope.back = function () {
                    $window.history.back();
                };
            }
        };
    });
