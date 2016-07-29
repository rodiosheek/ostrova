
function router($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: '/templates/home/_home.html',
            controller:  HomeCtrl
        })
        .when('/o-proekte', {
            templateUrl: '/templates/about/_about.html',
            activetab: 'about',
            controller: AboutCtrl
        })
        .when('/o-proekte/preimushestva', {
            templateUrl: '/templates/preim/_preim.html'
        })
        .when('/location', {
            templateUrl: '/templates/location/_location.html'
        })
        .when('/vubor-kvartiru', {
            templateUrl: '/templates/map/_map.html',
            controller: MapCtrl
        })
        .when('/korpus/:alt', {
            templateUrl: '/templates/map/corps/_corps.html',
            controller: CorpsCtrl
        })
        .when('/section/1', {
            templateUrl: '/templates/map/section/_section-1.html',
            controller: SectionCtrl
        })
        .when('/section/2', {
            templateUrl: '/templates/map/section/_section-2.html',
            controller: SectionCtrl
        })
        .when('/section/:section/floor/:floor', {
            templateUrl: '/templates/map/floor/_floor-section-1.html',
            controller: FloorCtrl
        })
        .when('/section/2/floor/', {
            templateUrl: '/templates/map/floor/_floor-section-2.html',
            controller: FloorCtrl
        })
        .when('/flat/:section/:floor/:room', {
            templateUrl: '/templates/map/flats/_flats.html',
            controller: FlatsCtrl
        })
        .when('/kak-kupit', {
            templateUrl: '/templates/how-to-bay/_how-to-bay.html'
        })
        .when('/kak-kupit/stoimosti-kvarti', {
            templateUrl: '/templates/how-to-bay/_price.html'
        })
        .when('/kak-kupit/tpovoy-dogovor', {
            templateUrl: '/templates/how-to-bay/_contracts.html'
        })
        .when('/kak-kupit/oline-bronirovanie', {
            templateUrl: '/templates/how-to-bay/_reservation.html',
            controller: ReservationCtrl
        })
        .when('/kak-kupit/otdel-prodag', {
            templateUrl: '/templates/how-to-bay/_sales-department.html'
        })
        .when('/novosti', {
            templateUrl: '/templates/news/_news.html',
            controller: NewsCtrl
        })
        .otherwise({
            redirectTo: '/home'
        })
};

app.config(router);