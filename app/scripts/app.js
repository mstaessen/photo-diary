'use strict';

angular.module('PhotoDiaryApp', ['ngResource', 'PhoneGap'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/shoot', {
                templateUrl: 'views/shoot.html',
                controller: 'ShootCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
