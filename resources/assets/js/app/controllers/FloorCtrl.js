function FloorCtrl($scope, $rootScope, $location, $routeParams, mapService) {
    console.log('Floor controller');

    var section = $routeParams.section;
    var floor = $routeParams.floor;
    $scope.id = $routeParams.id;
    $scope.section = section;
    console.log('section=->' + $scope.section);

    $scope.sectionInit = function () {
        $rootScope.loading = true;
        setTimeout(function () {
            $('.map-plans').svgDrawing({
                onclick: function (el) {
                    var room = el.data('alt');
                        console.log("Flats->" + room);
                    console.log(floor);
                    mapService.getRoomNumber(section, floor, room).then(
                        function(data) {
                            if(data.onSale != 0) {
                               $location.path('/building/' + $scope.id + '/section/' + section + '/floor/' + floor + '/room/' + room);
                            }
                        },
                        function(error) {
                            console.log(error);
                        }
                    );
                },
                onmouseover: function (el) {
                    var room = el.data('alt');
                    mapService.getRoomNumber(section, floor, room).then(
                        function(data) {
                            $scope.number = data;
                            if(data.onSale != 0) {
                                el.attr('opacity', 0.5);
                                $scope.message = '';
                            } else {
                                $scope.message = 'Продано';
                                console.log($scope.message);
                            }
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
                    $scope.message = '';
                }
            });
            $rootScope.loading = false;
        }, 1000);
    };
};

app.controller('FloorCtrl', FloorCtrl);