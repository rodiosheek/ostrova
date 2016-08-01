function FloorCtrl($scope, $location, $routeParams, mapService) {
    console.log('Floor controller');

    var section = $routeParams.section;
    var floor = $routeParams.floor;
    $scope.section = section;
    console.log('section=->' + $scope.section);





    $scope.sectionInit = function () {
        setTimeout(function () {
            $('.map-plans').svgDrawing({
                onclick: function (el) {
                    var room = el.data('alt');
                        console.log("Flats->" + room);
                    console.log(floor);
                        $scope.$apply(function () {
                            $location.path('/flat/' + section + '/' + floor + '/' + room);
                        })
                },
                onmouseover: function (el) {
                    var room = el.data('alt');
                    el.attr('opacity', 0.5);
                    mapService.getRoomNumber(section, floor, room).then(
                        function(data) {
                            $scope.number = data;
                            console.log('data->' + data);
                        },
                        function(error) {
                            console.log(error);
                        }
                    );
                    $('.rooms-popup').find('div[data-target=' + room + ']').show();

                },
                onmouseout: function (el) {
                    el.attr('opacity', 0);
                    var room = el.data('alt');
                    $('.rooms-popup').find('div[data-target=' + room + ']').hide();
                }
            });
        }, 1000);
    };
};

app.controller('FloorCtrl', FloorCtrl);