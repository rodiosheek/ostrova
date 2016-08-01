function NewsCtrl($scope, $rootScope, $http, $location) {
    console.log('News controller');
    $rootScope.activePage = 'news';
};

app.controller('NewsCtrl', NewsCtrl);