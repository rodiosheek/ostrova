function GalleryCtrl ($scope, $rootScope) {
	console.log('Gallery controller');
	$rootScope.activePage = 'gallery';
	console.log($rootScope.activePage);
}

app.controller('GalleryCtrl', GalleryCtrl);