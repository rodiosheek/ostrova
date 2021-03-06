
function MapCtrl($scope, $rootScope, $location, $routeParams, $route, $http, mapService) {
    'use strict';
    console.log('Map controller');
    $rootScope.activePage = 'map';
    var mapData = mapService.getMapData();
    //var getOnSaleFlats = mapService.getOnSaleFlats();
    
    mapData.then(
        function(data) {
            $scope.mapInfo = data;
        },
        function(error) {
            console.log(error);
        }
    );

    

    $scope.mapInit = function () {
        $rootScope.loading = true;
        setTimeout(function () {
            $('.map-plans').svgDrawing({
                onclick: function (el) {
                    var alt = el.data('alt');
                    var popup = $('.popup-menu').find('a[data-target=' + alt + ']');
                    if(!popup.hasClass('non-active')) {
                        if (alt != 'dc' && alt != 'tc' && alt != 'feetstyle') {
                            popup.find('.corps-link-popup').show();
                            $scope.$apply(function () {
                                $location.path('/korpus/' + alt);
                            })
                        }
                    }
                },
                onmouseover: function (el) {
                    var section = el.data('alt');
                    mapService.getOnSaleFlats(section).then(
                            function(data) {
                                $scope.flats = data;
                                console.log(data);
                            },
                            function(error) {
                                console.log(error);
                            }
                        )
                    if(!$('.popup-menu').find('a[data-target=' + section + ']').hasClass('non-active')) {
                        el.attr('opacity', 0.5);
                        $('.popup-menu').find('a[data-target=' + section + ']').find('.corps-link-popup').show();
                    }
                },
                onmouseout: function (el) {
                    el.attr('opacity', 0);
                    var alt = el.data('alt');
                    $('.popup-menu').find('a[data-target=' + alt + ']').find('.corps-link-popup').hide();
                }
            });
        $rootScope.loading = false;
        }, 1000);
    };

    $scope.mapInit();



};

app.controller('MapCtrl', MapCtrl);
