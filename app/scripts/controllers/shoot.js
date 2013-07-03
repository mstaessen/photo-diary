'use strict';

angular.module('PhotoDiaryApp')
    .controller('ShootCtrl', function ($scope, $location, Geolocation, Camera, PhotoService) {
        Camera.getPicture(function (picture) {
            $scope.$apply(function () {
                $scope.picture = picture;
            });
        }, function (error) {
            $scope.$apply(function () {
                $scope.error = error;
                $location.path('/');
            });
        }, {
            quality: 75,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG
        });
        Geolocation.getCurrentPosition(function (position) {
            $scope.$apply(function () {
                $scope.position = position.coords;
            });
        }, function (error) {
            console.log(error);
        }, {
            enableHighAccuracy: true
        });

        $scope.upload = function () {
            if ($scope.picture && $scope.position && $scope.title) {
                $scope.upload = {};
                PhotoService.upload($scope.picture, $scope.title, $scope.position, function(res) {
                    $scope.$apply(function() {
                        $scope.upload = null;
                        $location.path('/');
                    });
                }, function(error) {
                    $scope.$apply(function() {
                        $scope.upload = null;
                    });
                }, function(progress) {
                    if (progress.lengthComputable) {
                        $scope.$apply(function() {
                            $scope.upload.percent = progress.loaded / progress.total * 100 + '%';
                        });
                    }
                });
            }
        };

        // Set this for safety on iOS...
        $scope.$on('$destroy', function () {
            Camera.cleanup();
        });
    });
