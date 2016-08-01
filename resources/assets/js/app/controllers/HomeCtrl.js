

function HomeCtrl($scope, $rootScope) {
    console.log('Home controller');
    $rootScope.activePage = 'home';
    $scope.slider = {};
    $scope.slider.index = 0;
    $scope.viewClass = 'animation-fade';
    // Slider controls text
    $scope.slider.text = [
        {'text' : 'благоустройство территории'},
        {'text' : 'благоустройство территории-1'},
        {'text' : 'благоустройство территории-2'},
        {'text' : 'благоустройство территории-3'},
    ];
    //Slider images
    $scope.slider.images = [
        {'image' : '../../images/slider/slider-image/0006.jpg'},
        {'image' : '../../images/slider/slider-image/0004.jpg'},
        {'image' : '../../images/slider/slider-image/0005.jpg'},
        {'image' : '../../images/slider/slider-image/0001.jpg'},
    ];
    // Slider icons
    $scope.slider.icons = [
        {'icon' : '../../images/slider/slider-icons/0010.png'},
        {'icon' : '../../images/slider/slider-icons/0011.png'},
        {'icon' : '../../images/slider/slider-icons/0012.png'},
        {'icon' : '../../images/slider/slider-icons/0013.png'},
    ];
    // Next slide
    
    $scope.next = function () {
        var totalImg = $scope.slider.images.length;
        if(totalImg > 0) {
            $scope.slider.index = ($scope.slider.index == totalImg - 1) ? 0 : $scope.slider.index + 1;
        }
    };
    // Preview slide
    $scope.prev = function () {
        var totalImg = $scope.slider.images.length;
        if(totalImg > 0) {
            $scope.slider.index = ($scope.slider.index == 0) ? totalImg - 1 : $scope.slider.index - 1;
        }
    };
    // Slider autoplay
    $scope.autoPlay = function () {
        setTimeout(function () {
            $scope.next();
            $scope.autoPlay();
        }, 3000)
    };
};

app.controller('HomeCtrl', HomeCtrl);