function ContactsCtrl($scope, $rootScope) {
	console.log('Contacts controller');
	$rootScope.activePage = 'contacts';
}

app.controller('ContactsCtrl', ContactsCtrl);