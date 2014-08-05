'use strict';

var sensuApp = angular.module('sensuApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
    ])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/client', {
                templateUrl: '/sensuapp/views/client.html',
                controller: 'ClientCtrl'
            })
            .when('/alarm', {
                templateUrl: '/sensuapp/views/alarm.html',
                controller: 'AlarmCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
            })
            .when('/', {
                redirectTo: '/sensuapp/index.html'
            });

        // configure html5 to get links working on jsfiddle
//        $locationProvider
  //          .html5Mode(true);
    });
