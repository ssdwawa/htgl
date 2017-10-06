'use strict';
var aviationApp = angular.module('aviationApp', ['ui.router', 'backApp','enterpriseApp']);
    aviationApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .when('/', '/login')
            .when('', '/login')
            .otherwise('/login');

        $stateProvider
            .state('home', {
                abstract: true,
                url: '',
                templateUrl: 'home/home.html',
                controller: 'homeController'
            })
            .state('home.login', {
                url: '/login',
                templateUrl: 'home/home.login.html',
                controller: 'loginController'
            });
    }]);
angular.element(document).ready(function () {
    angular.bootstrap(angular.element(document), ['aviationApp']);
});