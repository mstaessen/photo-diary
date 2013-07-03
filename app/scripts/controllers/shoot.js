'use strict';

angular.module('PhotoDiaryApp')
    .controller('ShootCtrl', function ($scope, $location, Geolocation, Camera, PhoneGap, Config) {
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
            if ($scope.picture && $scope.position) {
                PhoneGap.ready().then(function() {
                    $scope.upload = {};
                    var ft = new FileTransfer();
                    var options = new FileUploadOptions();
                    options.fileKey = "photo";
                    options.fileName = $scope.picture.substr($scope.picture.lastIndexOf('/') + 1);
                    options.params = {
                        title: $scope.title,
                        location: [$scope.position.latitude, $scope.position.longitude].join(',')
                    };
                    ft.upload($scope.picture, encodeURI(Config.BASE_URL + '/photos'), function(res) {
                        $scope.$apply(function() {
                            $scope.upload = null;
                            $location.path('/');
                        });
                    }, function(error) {
                        $scope.$apply(function() {
                            $scope.upload = null;
                        });
                    }, options);
                    ft.onprogress = function(evt) {
                        if (evt.lengthComputable) {
                            $scope.$apply(function() {
                                $scope.upload.percent = evt.loaded / evt.total * 100 + '%';
                            });
                        }
                    };
                });
            }
        };

        // Set this for safety on iOS...
        $scope.$on('$destroy', function () {
            Camera.cleanup();
        });
    });
