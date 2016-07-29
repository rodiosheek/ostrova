# Laravel PHP Framework

[![Build Status](https://travis-ci.org/laravel/framework.svg)](https://travis-ci.org/laravel/framework)
[![Total Downloads](https://poser.pugx.org/laravel/framework/d/total.svg)](https://packagist.org/packages/laravel/framework)
[![Latest Stable Version](https://poser.pugx.org/laravel/framework/v/stable.svg)](https://packagist.org/packages/laravel/framework)
[![Latest Unstable Version](https://poser.pugx.org/laravel/framework/v/unstable.svg)](https://packagist.org/packages/laravel/framework)
[![License](https://poser.pugx.org/laravel/framework/license.svg)](https://packagist.org/packages/laravel/framework)


AngularJS [![Build Status](https://travis-ci.org/angular/angular.js.svg?branch=master)](https://travis-ci.org/angular/angular.js)
=========

AngularJS lets you write client-side web applications as if you had a smarter browser.  It lets you
use good old HTML (or HAML, Jade and friends!) as your template language and lets you extend HTML’s
syntax to express your application’s components clearly and succinctly.  It automatically
synchronizes data from your UI (view) with your JavaScript objects (model) through 2-way data
binding. To help you structure your application better and make it easy to test, AngularJS teaches
the browser how to do dependency injection and inversion of control.

It also helps with server-side communication, taming async callbacks with promises and deferreds,
and it makes client-side navigation and deeplinking with hashbang urls or HTML5 pushState a
piece of cake. Best of all? It makes development fun!

* Web site: https://angularjs.org
* Tutorial: https://docs.angularjs.org/tutorial
* API Docs: https://docs.angularjs.org/api
* Developer Guide: https://docs.angularjs.org/guide
* Contribution guidelines: [CONTRIBUTING.md](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md)
* Dashboard: https://dashboard.angularjs.org



### Structure of Angular application
```
redources/ 
-------- assets/
-------------- app/ 
------------------ controllers/ 
------------------------ CorpsCtrl.js
------------------------ AbouteCtrl.js
------------------------ FlatsCtrl.js
------------------------ FloorCtrl.js
------------------------ FlatsCtrl.js
------------------------ FloorCtrl.js
------------------------ HomeCtrl.js
------------------------ MapCtrl.js
------------------------ SectionCtlr.js
------------------ jquery-scripts/
------------------------ jquery-scripts.js /* Scripts for resize page and draving SVG maps
------------------ services/
------------------------ mapService.js
------------------ sources/
------------------------ angular-animate.js
------------------------ angular-route.js
------------------------ angular.js
------------------------ jquery.js
------------------------ mask.js
------------------------ raphael.js
------------------------ scale.raphael.js
------------------ app.js
------------------ routes.js

Views for Angular located in 

public/
------ templates/

Laravel controllers for Angular application in 

app/
--- Http/
------- Controllers/
---------------- Building9aController.php /* to RESTful  between Laravel and Angular
```
