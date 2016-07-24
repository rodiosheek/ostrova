
function router($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home/_home.html',
            controller:  HomeCtrl
        })
        .when('/o-proekte', {
            templateUrl: 'views/about/_about.html',
            activetab: 'about',
            controller: AboutCtrl
        })
        .when('/o-proekte/preimushestva', {
            templateUrl: 'views/preim/_preim.html'
        })
        .when('/location', {
            templateUrl: 'views/location/_location.html'
        })
        .when('/vubor-kvartiru', {
            templateUrl: 'views/map/_map.html',
            controller: MapCtrl
        })
        .when('/korpus/:alt', {
            templateUrl: 'views/map/corps/_corps.html',
            controller: CorpsCtrl
        })
        .when('/section/1', {
            templateUrl: 'views/map/section/_section-1.html',
            controller: SectionCtrl
        })
        .when('/section/2', {
            templateUrl: 'views/map/section/_section-2.html',
            controller: SectionCtrl
        })
        .when('/section/1/floor/', {
            templateUrl: 'views/map/floor/_floor-section-1.html',
            controller: FloorCtrl
        })
        .when('/section/2/floor/', {
            templateUrl: 'views/map/floor/_floor-section-2.html',
            controller: FloorCtrl
        })
        .when('/flat/:alt', {
            templateUrl: 'views/map/flats/_flats.html',
            controller: FlatsCtrl
        })
        .when('/kak-kupit', {
            templateUrl: 'views/how-to-bay/_how-to-bay.html'
        })
        .when('/kak-kupit/stoimosti-kvarti', {
            templateUrl: 'views/how-to-bay/_price.html'
        })
        .when('/kak-kupit/tpovoy-dogovor', {
            templateUrl: 'views/how-to-bay/_contracts.html'
        })
        .when('/kak-kupit/oline-bronirovanie', {
            templateUrl: 'views/how-to-bay/_reservation.html',
            controller: ReservationCtrl
        })
        .when('/kak-kupit/otdel-prodag', {
            templateUrl: 'views/how-to-bay/_sales-department.html'
        })
        .when('/novosti', {
            templateUrl: 'views/news/_news.html',
            controller: NewsCtrl
        })
        .otherwise({
            redirectTo: '/home'
        })
};

app.config(router);