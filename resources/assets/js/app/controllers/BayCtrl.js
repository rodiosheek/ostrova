function BayCtrl($scope, $rootScope) {
	console.log('Bay controller');
	$rootScope.activePage = 'bay';

	$scope.addRating = function() {
		console.log('+');
	}
}

app.controller('BayCtrl', BayCtrl);