import dashboardTemplate from './templates/dashboard.html';
import rateMovieTemplate from './templates/rate-movie.html';
import rateTvTemplate from './templates/rate-tv.html';

function applicationRouteConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: dashboardTemplate,
            controller: 'dashboardCtrl as ctrl'
        })
        .state('rate-movie', {
            url: "/rate-movie",
            templateUrl: rateMovieTemplate,
            controller: 'rateMovieCtrl as ctrl'
        })
        .state('rate-tv', {
            url: "/rate-tv",
            templateUrl: rateTvTemplate,
            controller: 'rateTvCtrl as ctrl'
        })

}

applicationRouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export default applicationRouteConfig;