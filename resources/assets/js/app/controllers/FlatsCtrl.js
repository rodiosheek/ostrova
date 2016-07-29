function FlatsCtrl($scope, $location, $routeParams, mapService, $http) {
    console.log('Flats controller');
    $scope.formShow = false;
    var section = $routeParams.section;
    var floor = $routeParams.floor;
    $scope.room = $routeParams.room;

    mapService.getRoomNumber(section, floor, $scope.room).then(
        function(data) {
            $scope.flat = data;
        },
        function(error) {
            console.log(error);
        });


    $scope.formShow = false;
    $scope.done = false;
    $scope.httpLoading = false;
    $scope.flatId = $routeParams.room;
    console.log("Flat # " + $scope.flatId);


    $scope.reservationFlat = function() {
        $scope.done = !$scope.done;
        $scope.httpLoading = !$scope.httpLoading;
        $http.post('send/' + $scope.flat.number, $scope.form)
            .success(function(data){
                $scope.httpLoading = !$scope.httpLoading;
            })
            .error(function(data) {
                console.log(data);
                $scope.done = !$scope.done;
            });

    }

}

app.controller('FlatsCtrl', FlatsCtrl);