
function MapCtrl($scope, $location, $routeParams, $route) {
    
    console.log('Map controller');

    $scope.mapInit = function () {
        setTimeout(function () {
            $('.map-plans').svgDrawing({
                onclick: function (el) {
                    var alt = el.data('alt');
                    if(!$('.popup-menu').find('a[data-target=' + alt + ']').hasClass('non-active')) {
                        console.log(alt)
                        $scope.$apply(function () {
                            $location.path('/korpus/' + alt);
                        })
                    }
                },
                onmouseover: function (el) {
                    var alt = el.data('alt');
                    if(!$('.popup-menu').find('a[data-target=' + alt + ']').hasClass('non-active')) {
                        el.attr('opacity', 0.5);
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

app.controller('MapCtrl', MapCtrl);