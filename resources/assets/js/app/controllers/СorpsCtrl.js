function CorpsCtrl($scope, $location, $routeParams, mapService) {
    console.log('Korpus controller');

    var id = $routeParams.alt;

    var CountFlatsSection_1 = mapService.getSection_1();
    var CountFlatsSection_2 = mapService.getSection_2();

    CountFlatsSection_1.then(
        function(data) {
            $scope.section_1 = data;
        },
        function(error) {
            console.log(error);
        }
    );

    CountFlatsSection_2.then(
        function(data) {
            $scope.section_2 = data;
        },
        function(error) {
            console.log(error);
        }
    );

    $scope.sectionInit = function () {
            setTimeout(function () {
                $('.map-plans').svgDrawing({
                    onclick: function (el) {
                        var alt = el.data('alt');
                        if(!$('.popup-menu').find('a[data-target=' + alt + ']').hasClass('non-active')) {
                            console.log("Corps->" + alt);
                            $scope.$apply(function () {
                                $location.path('/section/' + alt);
                            })
                        }
                    },
                    onmouseover: function (el) {

                        var alt = el.data('alt');
                        el.attr('opacity', 0.5);
                        if(!$('.popup-menu').find('a[data-target=' + alt + ']').hasClass('non-active')) {
                            $('.popup-menu').find('a[data-target=' + alt + ']').find('.corps-link-popup').show();
                        }
                    },
                    onmouseout: function (el) {
                        el.attr('opacity', 0);
                        var alt = el.data('alt');
                        $('.popup-menu').find('a[data-target=' + alt + ']').find('.corps-link-popup').hide();
                    }
                });
            }, 1000);
    };
};

app.controller('CorpsCtrl', CorpsCtrl);