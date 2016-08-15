function CorpsCtrl($scope, $location, $routeParams, mapService, $rootScope) {
    console.log('Korpus controller');

    var building = $routeParams.alt;
    $scope.section = $routeParams.alt;
    console.log($scope.section);   

    $scope.sectionInit = function () {
        $rootScope.loading = true;
            setTimeout(function () {
                $('.map-plans').svgDrawing({
                    onclick: function (el) {
                        var section = el.data('alt');
                        if(!$('.popup-menu').find('a[data-target=' + section + ']').hasClass('non-active')) {
                            console.log("Corps->" + section);
                            $scope.$apply(function () {
                                $location.path('/building/' + building + '/section/' + section);
                            })
                        }
                    },
                    onmouseover: function (el) {

                        var section = el.data('alt');
                        el.attr('opacity', 0.5);
                        mapService.getSection(building, section).then(
                            function(data) {
                                $scope.section_1 = data;
                            },
                            function(error) {
                                console.log(error);
                            });
                        if(!$('.popup-menu').find('a[data-target=' + section + ']').hasClass('non-active')) {
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

};

app.controller('CorpsCtrl', CorpsCtrl);