'use strict';

/* jshint global: google */
angular.module('PhotoDiaryApp')
    .service('PhotoService', function (Config, $resource, PhoneGap) {
        var Photos = $resource(Config.BASE_URL + '/photos/within/:bounds', {});

        return {
            within: function (bounds, callback) {
                if (!(bounds instanceof google.maps.LatLngBounds)) {
                    throw 'IllegalArgumentException';
                }

                var photos = Photos.query({bounds: bounds.toUrlValue()}, function (params, data, success, error) {
                    photos.forEach(function (photo) {
                        photo.url = Config.BASE_URL + '/uploads/' + photo.filename;
                    });
                    callback(error, photos);
                });
            },
            upload: function (picture, title, position, success, error, progress) {
                PhoneGap.ready().then(function () {
                    var ft = new FileTransfer();
                    var options = new FileUploadOptions();
                    options.fileKey = 'photo';
                    options.fileName = picture.substr(picture.lastIndexOf('/') + 1);
                    options.params = {
                        title: title,
                        location: [position.latitude, position.longitude].join(',')
                    };
                    ft.upload(picture, encodeURI(Config.BASE_URL + '/photos'), function (res) {
                        if (success) {
                            success(res);
                        }
                    }, function (err) {
                        if (error) {
                            error(err);
                        }
                    }, options);
                    ft.onprogress = progress;
                });
            }
        };
    });
