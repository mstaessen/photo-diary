'use strict';

angular.module('PhotoDiaryApp')
    .controller('MainCtrl', function ($scope, Geolocation) {
        Geolocation.getCurrentPosition(function(position) {
            $scope.$apply(function() {
                $scope.center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            });
        }, function(error) {
            console.log('Error while updating position');
        }, {
            enableHighAccuracy: true
        });
    });
