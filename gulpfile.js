var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    elixir(function (mix) {
        mix
            .styles([
                'styles.css'
            ])
            .scripts([
                'sources/jquery.js',
                'sources/raphael.js',
                'sources/scale.raphael.js',
                'app/jquery-scripts/*.js',
                'sources/angular.js',
                'sources/angular-animate.js',
                'sources/angular-route.js',
                'sources/mask.js',
                'app/app.js',
                'app/routes.js',
                'app/controllers/**/*.js',
                'app/services/**/*.js'
            ])
            .version([
                'css/all.css',
                'js/all.js'
            ])
            .copy(
                'public/js/all.js.map', 'public/build/js/all.js.map'
            )
            .copy(
                'public/css/all.css.map', 'public/build/css/all.css.map'
            );
    });
});
