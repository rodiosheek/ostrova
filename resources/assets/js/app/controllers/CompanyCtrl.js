function CompanyCtrl($scope, $rootScope) {
	console.log('Company controller');
	$rootScope.activePage = 'company';
	 $scope.printPdf = function () {
        
        var doc = open('../../documents/dogovor.pdf');
        
        doc.print();
    }
}

app.controller('CompanyCtrl', CompanyCtrl);