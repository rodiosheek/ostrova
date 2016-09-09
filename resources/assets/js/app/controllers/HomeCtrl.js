

function HomeCtrl($scope, $rootScope, $location) {
    console.log('Home controller');
    $rootScope.activePage = 'home';
    $scope.slider = {};
    $scope.slider.index = 0;
    $scope.viewClass = 'animation-fade';
    // Slider controls text
    $scope.slider.text = [
        {'text' : 'Благоустройство по  европейскому принципу'},
        {'text' : 'закрытая охраняемая территория'},
        {'text' : 'детский сад, магазины, аптека'},
        {'text' : 'фитнес-клуб, стадион и тренажерная площадка'},
    ];
    //Slider images
    $scope.slider.images = [
        {'image' : '../../images/slider/slider-image/0007-min.jpg'},
        {'image' : '../../images/slider/slider-image/0005-min.jpg'},
        {'image' : '../../images/slider/slider-image/0004-min.jpg'},
        {'image' : '../../images/slider/slider-image/0006-min.jpg'},
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
        console.log('autoplay start');
        setTimeout(function () {
            $scope.next();
            $scope.autoPlay();
        }, 3000)
    };
    
   $scope.refPage = function () {
        console.log('Refresh');
        $locarion.reload();
       
   };

};

app.controller('HomeCtrl', HomeCtrl);