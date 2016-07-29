function SectionCtrl($scope, $location, $routeParams, $route, mapService) {
    console.log('Section controller');

    var section = $route.current.originalPath.split('/')[2];



    $scope.sectionInit = function () {
        setTimeout(function () {
            $('.map-plans').svgDrawing({
                onclick: function (el) {
                    var floor = el.data('alt');
                    if(!$('.popup-menu').find('a[data-target=' + floor + ']').hasClass('non-active')) {
                        $scope.$apply(function () {
                            $location.path('/section/' + section + '/floor/' + floor);
                        })
                    }
                },
                onmouseover: function (el) {

                    var floor = el.data('alt');
                    console.log('section->' + section);
                    console.log('floor->' + floor);
                    var getFloorFlatsCount = mapService.getFloorFlats(section, floor);
                    getFloorFlatsCount.then(
                        function(data) {
                            $scope.flats = data;
                        },
                        function(error) {
                            console.log(error);
                        }
                    );
                    el.attr('opacity', 0.5);

                    $('.popup-menu').find('div[data-target=' + floor + ']').find('.corps-link-popup').show();
                },
                onmouseout: function (el) {
                    el.attr('opacity', 0);
                    var alt = el.data('alt');
                    $('.popup-menu').find('div[data-target=' + alt + ']').find('.corps-link-popup').hide();
                }
            });
            
        }, 1000);
    };
};

app.controller('SectionCtrl', SectionCtrl);