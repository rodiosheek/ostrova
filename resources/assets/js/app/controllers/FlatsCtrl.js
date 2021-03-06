function FlatsCtrl($scope, $location, $routeParams, mapService, $http) {
    console.log('Flats controller');
    $scope.formShow = false;

    $scope.section = $routeParams.section;
    $scope.floor = $routeParams.floor;
    $scope.room = $routeParams.room;
    $scope.id = $routeParams.id;

    mapService.getRoomNumber($scope.id, $scope.section, $scope.floor, $scope.room).then(
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
        var path = '/send/' + $scope.id + '/' + $scope.flat.number;
        $http.post(path, $scope.form)
            .success(function(data){
                $scope.httpLoading = !$scope.httpLoading;
                console.log(data);
            })
            .error(function(error) {
                console.log(error);
                $scope.done = !$scope.done;
            });

    }

}

app.controller('FlatsCtrl', FlatsCtrl);