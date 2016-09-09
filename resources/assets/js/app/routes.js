
function router($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/templates/home/_home.html',
            controller:  HomeCtrl
        })
        .when('/o-proekte', {
            templateUrl: '/templates/preim/_preim.html',
            activetab: 'about',
            controller: AboutCtrl
        })
        .when('/o-proekte/preimushestva', {
            templateUrl: '/templates/about/_about.html',
            contoroller: AboutCtrl
        })
        .when('/gallery', {
            templateUrl: '/templates/gallery/gallery.html',
            controller: GalleryCtrl
        })
        .when('/vybor-kvartiry', {
            templateUrl: '/templates/map/_map.html',
            controller: MapCtrl
        })
        .when('/korpus/:alt', {
            templateUrl: '/templates/map/corps/_corps.html',
            controller: CorpsCtrl
        })
        .when('/building/:id/section/:section', {
            templateUrl: '/templates/map/section/_section-1.html',
            controller: SectionCtrl
        })
        .when('/building/:id/section/:section/floor/:floor', {
            templateUrl: '/templates/map/floor/_floor-section-1.html',
            controller: FloorCtrl
        })
        .when('/building/:id/section/:section/floor/:floor/room/:room', {
            templateUrl: '/templates/map/flats/_flats.html',
            controller: FlatsCtrl
        })
        .when('/kak-kupit', {
            templateUrl: '/templates/how-to-bay/_how-to-bay.html',
            controller: BayCtrl
        })
        .when('/stoimost-kvartiry', {
            templateUrl: '/templates/how-to-bay/_price.html',
            controller: BayCtrl
        })
        .when('/tipovoy-dogovor', {
            templateUrl: '/templates/how-to-bay/_contracts.html',
            controller: BayCtrl
        })
        .when('/kak-kupit/online-bronirovanie', {
            templateUrl: '/templates/how-to-bay/_reservation.html',
            controller: ReservationCtrl
        })
        .when('/kak-kupit/documenty', {
            templateUrl: '/templates/how-to-bay/_documents.html',
            controller: ReservationCtrl
        })
        .when('/otdel-prodazh', {
            templateUrl: '/templates/how-to-bay/_sales-department.html',
            controller: BayCtrl
        })
        .when('/novosti', {
            templateUrl: '/templates/news/_news.html',
            controller: NewsCtrl
        })
        .when('/novosti/:postId', {
            templateUrl: '/templates/news/_one_news.html',
            controller: NewsCtrl
        })
        .when('/kompania', {
            templateUrl: '/templates/company/company.html',
            controller: CompanyCtrl
        })
        .when('/kompania/tarifu', {
            templateUrl: '/templates/company/_tarify.html',
            controller: CompanyCtrl
        })
        .when('/kompania/dogovor', {
            templateUrl: '/templates/company/_dogovor.html',
            controller: CompanyCtrl
        })
        .when('/news', {
            templateUrl: '/news',
            controller: NewsCtrl
        })
        .when('/contacts', {
            templateUrl: '/templates/contacts/contacts.html',
            controller: ContactsCtrl
        })
        .otherwise({
            redirectTo: '/'
        });
        //$locationProvider.html5Mode(true);
        
};

app.config(router);
