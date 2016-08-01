function AboutCtrl($scope, $route, $rootScope) {
    console.log('About controller');
    $rootScope.activePage = 'about';
    console.log($rootScope.activePage);

}

app.controller('AboutCtrl', AboutCtrl);