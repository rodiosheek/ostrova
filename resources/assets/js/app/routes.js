
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
            templateUrl: '/templates/preim/_preim.html',
            contoroller: AboutCtrl
        })
        .when('/gallery', {
            templateUrl: '/templates/gallery/gallery.html',
            controller: GalleryCtrl
        })
        .when('/vubor-kvartiru', {
            templateUrl: '/templates/map/_map.html',
            controller: MapCtrl
        })
        .when('/korpus/:alt', {
            templateUrl: '/templates/map/corps/_corps.html',
            controller: CorpsCtrl
        })
        .when('/section/:section', {
            templateUrl: '/templates/map/section/_section-1.html',
            controller: SectionCtrl
        })
        .when('/section/:section/floor/:floor', {
            templateUrl: '/templates/map/floor/_floor-section-1.html',
            controller: FloorCtrl
        })
        .when('/flat/:section/:floor/:room', {
            templateUrl: '/templates/map/flats/_flats.html',
            controller: FlatsCtrl
        })
        .when('/kak-kupit', {
            templateUrl: '/templates/how-to-bay/_how-to-bay.html',
            controller: BayCtrl
        })
        .when('/kak-kupit/stoimosti-kvarti', {
            templateUrl: '/templates/how-to-bay/_price.html',
            controller: BayCtrl
        })
        .when('/kak-kupit/tpovoy-dogovor', {
            templateUrl: '/templates/how-to-bay/_contracts.html',
            controller: BayCtrl
        })
        .when('/kak-kupit/oline-bronirovanie', {
            templateUrl: '/templates/how-to-bay/_reservation.html',
            controller: ReservationCtrl
        })
        .when('/kak-kupit/otdel-prodag', {
            templateUrl: '/templates/how-to-bay/_sales-department.html',
            controller: BayCtrl
        })
        .when('/novosti', {
            templateUrl: '/templates/news/_news.html',
            controller: NewsCtrl
        })
        .when('/kompania', {
            templateUrl: '/templates/company/company.html',
            controller: CompanyCtrl
        })
        .when('/kompania/tarifu', {
            templateUrl: '/templates/company/company.html',
            controller: CompanyCtrl
        })
        .when('/kompania/dogovor', {
            templateUrl: '/templates/company/company.html',
            controller: CompanyCtrl
        })
        .when('/kontaktu', {
            templateUrl: '/templates/contacts/contacts.html',
            controller: ContactsCtrl
        })
        .otherwise({
            redirectTo: '/home'
        })
};

app.config(router);