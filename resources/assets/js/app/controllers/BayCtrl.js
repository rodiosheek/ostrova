function BayCtrl($scope, $rootScope) {
	console.log('Bay controller');
	$rootScope.activePage = 'bay';
}

app.controller('BayCtrl', BayCtrl);