function CompanyCtrl($scope, $rootScope) {
	console.log('Company controller');
	$rootScope.activePage = 'company';
}

app.controller('CompanyCtrl', CompanyCtrl);