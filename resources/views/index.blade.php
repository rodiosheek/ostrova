<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Острова</title>

    <!-- CSS style -->
    <link href="{{ elixir('css/all.css') }}" rel="stylesheet">

    <base href="/">

</script>

</head>
<body  ng-app="app">
<!-- Body -->
<div class="body-frame">

    <!-- Header -->
    <header class="header">
        <!-- Header background -->

        <img class="bg-img" src="/images/backgrounds/header-bg.png" alt="header-background">

        <a href="#/" class="logo"></a>
        <!-- Header navigation -->
        <nav class="header-nav">
            <div class="nav-menu">
                <div class="nav-item" ng-class="{ 'tab-active': activePage == 'about'}"  >
                    <a href="#/o-proekte">о проекте</a>
                <div class="nav-popup" style="left:-33px">
                        <ul>
                            <li><a href="#/o-proekte/preimushestva">преимущества</a></li>
                        </ul>
                    </div>
                </div>
                <div class="nav-item" ng-class="{ 'tab-active': activePage == 'gallery'}">
                    <a href="/gallery">галерея</a>
                    <div class="nav-popup" style="left: -20px;">
                        
                        <ul>
                            <li><a href="/gallery">фотоотчет</a></li>
                        </ul>
                    </div>
                </div>
                <div class="nav-item" ng-class="{ 'tab-active': activePage == 'map'}">
                    <a href="#/vybor-kvartiry">выбор квартиры</a>
                </div>
                <div class="nav-item" ng-class="{ 'tab-active': activePage == 'bay'}">
                    <a href="">как купить</a>
                    <div class="nav-popup" style="left:-25px;">
                       
                        <ul>
                            <li><a href="#/stoimost-kvartiry">стоимость квартир</a></li>
                            <li><a href="#/tipovoy-dogovor">типовой договор</a></li>
                            <!--
                            <li><a href="/kak-kupit/online-bronirovanie">online бронирование</a></li>
                            -->
                            <li><a href="#/otdel-prodazh">отдел продаж</a></li>
                        </ul>
                    </div>
                </div>
                <div class="nav-item" ng-class="{ 'tab-active': activePage == 'news'}">
                    <a href="/news" ng-click="refPage()">Новости</a>
                </div>
                <div class="nav-item" ng-class="{ 'tab-active': activePage == 'company'}" style="width: 171px;">
                    <a href="">управляющая компания</a>
                    <div class="nav-popup" style="left:-25px;padding: 100px 50px 17px;">
                        <ul>
                            <li><a href="#/kompania/tarifu">тарифы</a></li>
                            <li><a href="#/kompania/dogovor">договор</a></li>
                        </ul>
                    </div>
                </div>
                <div class="nav-item" ng-class="{ 'tab-active': activePage == 'contacts'}">
                    <a href="#/contacts">контакты</a>
                </div>
                <!-- 
                <div class="nav-item">
                    <a href="http://dominanta-d.com/">вторичная недвижимость</a>
                </div>
                -->
            </div>
        </nav>
        <!-- Contact phone -->
        <div class="contact-phone">
            <!--   ???
            <img src="assets/images/other/intostroi.png">
            -->
            <div class="header-contacts">
                <div class="phone-text">Отдел продаж</div>
                <div class="phone-number">+38 048 700 18 18</div>
                <div class="phone-number">+38 048 700 23 37</div>
            </div>
        </div>
        <!-- Logo intostroi -->
        <a href="http://intostroy.com/" target="_blanck" class="logo-intostroi"><img src="/images/intostroi.png"></a>
    </header>
    <!-- Angular views -->

    <div  ng-view class="view-animate"></div>

    <!-- Loading -->
    <div class="loading" ng-show="loading">
        <img src="/images/loading.gif">
    </div>

    <!-- Footer -->

    <footer class="footer">
        <img class="bg-img" src="/images/backgrounds/footer-bg.png" alt="footer-background">
        <div class="social">
            <a href="https://www.instagram.com/ostrova_7001818" target="_blank"><div class="instagram"></div> </a>
            <a href="https://www.facebook.com/ostrova.odessa" target="_blank"><div class="facebook"></div> </a>
            <a href="https://vk.com/ostrova_odessa" target="_blank"><div class="vk"></div> </a>
            
            <!-- <a href=""><div class="google"></div> </a>
            <a href=""><div class="twitter"></div> </a>
            <a href=""><div class="youtube"></div> </a>
            <a href=""><div class="odnoklassniki"></div> </a> -->
        </div>
    </footer>
</div>



<script src="{{ elixir('js/all.js') }}"></script>
    <script type="text/javascript" src="//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js"></script>
</body>
</html>