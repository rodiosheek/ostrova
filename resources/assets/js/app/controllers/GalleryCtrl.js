function GalleryCtrl ($scope, $rootScope, $http) {
	console.log('Gallery controller');
	$rootScope.activePage = 'gallery';


	$http.get('/wordpress/?json=get_posts')
		.success(function(data) {
			$scope.posts = data.posts;
			console.log(data.posts);
		})
		.error(function(error) {
			console.log(error);
		});

	$('.slider').slick();
};

app.controller('GalleryCtrl', GalleryCtrl);