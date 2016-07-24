function FlatsCtrl($scope, $location, $routeParams) {
    console.log('Flats controller');
    $scope.formShow = false;
    $scope.flatId = $routeParams.alt;
    console.log("Flat # " + $scope.flatId);


    $scope.reservationFlat = function() {
        console.log('Name->' + $scope.form.name);
        console.log('Phone->' + $scope.form.phone);
        $scope.formShow = !$scope.formShow;
    }
}

app.controller('FlatsCtrl', FlatsCtrl);