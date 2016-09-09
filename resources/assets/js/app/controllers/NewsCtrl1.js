function NewsCtrl($scope, $rootScope, $http, $routeParams, $location) {
    console.log('News controller');
    $rootScope.activePage = 'news';
    
    
        
        window.location.reload();
 
    
    /*
    console.log('Post->');
    $http.get('/wordpress/?json=get_posts')
        .success(function(data) {
            $scope.posts = data.posts;
            console.log(data.posts);
        })
        .error(function(error) {
            console.log(error);
        })

    if($routeParams.postId) {
        console.log($routeParams.postId);
        var path = 'wordpress/?json=get_post&id=' + $routeParams.postId;
        $http.get(path)
            .success(function(data) {
                $scope.post = data.post;
                console.log(data);
            })
            .error(function(error) {
                console.log(error);
            })
    }
    */
};

app.controller('NewsCtrl', NewsCtrl);

app.filter('postLimit', function () {
    return function (text, length) {
        if (text.length > length) {
            return text.substr(0, length);
        }
        return text;
    }
});