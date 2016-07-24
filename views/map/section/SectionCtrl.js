function SectionCtrl($scope, $location, $routeParams, $route) {
    console.log('Section controller');

    var id = $route.current.originalPath.split('/')[2];
    console.log( id);


    $scope.sectionInit = function () {
        setTimeout(function () {
            $('.map-plans').svgDrawing({
                onclick: function (el) {
                    var alt = el.data('alt');
                    if(!$('.popup-menu').find('a[data-target=' + alt + ']').hasClass('non-active')) {
                        console.log("Id->" + id);
                        $scope.$apply(function () {
                            $location.path('/section/' + id + '/floor/');
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

app.controller('SectionCtrl', SectionCtrl);