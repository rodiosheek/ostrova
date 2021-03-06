function CorpsCtrl($scope, $location, $routeParams, mapService) {
    console.log('Korpus controller');

    var id = $routeParams.alt;


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