
/*
	Dependencies
*/
import angular from "angular";
import 'angular-material';
import 'angular-ui-router';
import 'angular-material/angular-material.css';

/*
	Style Modifiers
*/

import "normalize.css";
import "./dist/js/modernizr-custom.js"
import "./dist/css/main-styles.css";
import "./dist/css/dashboard-styles.css";
import "./dist/css/rateItem-styles.css";

/*
	UI Router Config
*/
import routeConfig from './src/app/routes/ui-router';

/*
	Main App Loader 
*/

let app = angular.module('mainApp', [ 'ui.router', 'ngMaterial']);

/*
	Components
*/

// app.component('itemslist', {
//     //...
// });

/*
	Services
*/

import getDashboardService from './src/app/services/getDashboardItems';
import rateMovieService from './src/app/services/rateMovieService';
import rateTvService from './src/app/services/rateTvService';
import getMovieService from './src/app/services/getMovieService';
import getTvShowService from './src/app/services/getTvShowService';

app.service('getDashboardItems', getDashboardService);
app.service('rateMovieService', rateMovieService);
app.service('rateTvService', rateTvService);
app.service('getMovieService', getMovieService);
app.service('getTvShowService', getTvShowService);

/*
	Controllers
*/

import dashboardCtrl from './src/app/controllers/dashboardCtrl';
import rateMovieCtrl from './src/app/controllers/rateMovieCtrl';
import rateTvCtrl from './src/app/controllers/rateTvCtrl';

app.controller('dashboardCtrl', dashboardCtrl);
app.controller('rateMovieCtrl', rateMovieCtrl);
app.controller('rateTvCtrl', rateTvCtrl);

/*
	App config
*/

app.config(routeConfig);

app.constant('config', {

	apikey : 'c981cff747269aa22ef3da26d61b61ad',
	baseApiUrl : 'https://api.themoviedb.org/3/',
    imgUrl: 'http://image.tmdb.org/t/p/',
    ApiModifiers:{
    	discover: 'discover',
    	movie: 'movie',
    	tv: 'tv',
    },
    imgSizes:
    {
    	tiny: 'w500',
    	nomarl: 'w1000',
    	big: 'w2000',
    },
});
