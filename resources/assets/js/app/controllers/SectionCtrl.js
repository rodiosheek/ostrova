function SectionCtrl($scope, $rootScope, $location, $routeParams, $route, mapService) {
    console.log('Section controller');

    
    $scope.section = $routeParams.section;
    $scope.id = $routeParams.id;
    console.log($scope.id);


    $scope.sectionInit = function () {
        $rootScope.loading = true;
        setTimeout(function () {
            $('.map-plans').svgDrawing({
                onclick: function (el) {
                    var floor = el.data('alt');
                    if(!$('.popup-menu').find('a[data-target=' + floor + ']').hasClass('non-active')) {
                        $scope.$apply(function () {
                            $location.path('/building/' + $scope.id + '/section/' + $scope.section + '/floor/' + floor);
                        })
                    }
                },
                onmouseover: function (el) {

                    var floor = el.data('alt');
                    console.log('section->' + $scope.section);
                    console.log('floor->' + floor);
                    var getFloorFlatsCount = mapService.getFloorFlats($scope.section, floor);
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
            $rootScope.loading = false;
        }, 1000);
    };
};

app.controller('SectionCtrl', SectionCtrl);