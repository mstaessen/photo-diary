'use strict';

angular.module('PhotoDiaryApp')
    .directive('gmap', function ($resource, PhotoService) {
        return {
            template: '<div style="background-color: black;"></div>',
            replace: true,
            restrict: 'E',
            scope: {
                center: '='
            },
            link: function postLink($scope, element, attrs) {
                var markers = [];
                var lastUpdate = 0;
                var map = new google.maps.Map(element[0], {
                    center: new google.maps.LatLng(50.503887, 4.469936),
                    zoom: 8,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    panControl: false,
                    streetViewControl: false,
                    zoomControl: true,
                    zoomControlOptions: {
                        style: google.maps.ZoomControlStyle.SMALL,
                        position: google.maps.ControlPosition.RIGHT_BOTTOM
                    }
                });

                $scope.$watch('center', function(newCenter) {
                    if (newCenter instanceof google.maps.LatLng) {
                        map.setCenter(newCenter);
                    }
                });

                google.maps.event.addListener(map, 'bounds_changed', function() {
                    var date = new Date();
                    if ((date - lastUpdate) > 1000) {
                        markers.forEach(function(marker) {
                            marker.setMap(null);
                        });
                        PhotoService.within(map.getBounds(), function(error, photos) {
                            photos.forEach(function(photo) {
                                if (!markers[photo._id]) {
                                    markers[photo._id] = {
                                        marker: new google.maps.Marker({
                                            clickable: true,
                                            draggable: false,
                                            animation: google.maps.Animation.DROP
                                        }),
                                        infoWindow: new google.maps.InfoWindow({
                                            content: '<h4>' + photo.title + '</h4><img style="max-width: 200px; max-height: 200px;" src="' + photo.url + '" />'
                                        })
                                    };
                                    markers[photo._id].marker.setMap(map);
                                    google.maps.event.addListener(markers[photo._id].marker, 'click', function() {
                                        markers[photo._id].infoWindow.open(map, markers[photo._id].marker);
                                    });
                                }
                                markers[photo._id].marker.setTitle(photo.title);
                                markers[photo._id].marker.setPosition(new google.maps.LatLng(photo.location.lat, photo.location.lng));
                            });
                        });
                        lastUpdate = date;
                    }
                });

            }
        };
    });
