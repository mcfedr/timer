/**
 * Created by mcfedr on 31/05/2014.
 */
angular.module('timer', ['ngAnimate', 'ngTouch', 'ngStorage', 'ui.router', 'ngFitText'])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/play');
        $stateProvider
            .state('play', {
                url: '/play',
                templateUrl: 'partials/play.html',
                controller: 'play'
            })
            .state('settings', {
                url: '/settings',
                templateUrl: 'partials/settings.html',
                controller: 'settings'
            });
    });
