/*
	Dashboar Controller
*/

class dashboardCtrl {

    constructor( getDashboardItems , config , $location ,  getMovieService, getTvShowService) {

    	this.config = config;
        this.location = $location;
        this.getMovieService = getMovieService;
        this.getTvShowService = getTvShowService;

    	getDashboardItems.getMovieItems().then((data) => {
	    	this.movieItems = data.data.results;
    	});

    	getDashboardItems.getTvItems().then((data) => {
	    	this.tvItems = data.data.results;
            console.log(this.tvItems);
    	});
    	
    }

    ChangeToRateItem ( item, view ) {

        if ( view == 'rate-movie' ) {
            this.getMovieService.setMovieItem( item );
        }

        if ( view == 'rate-tv' ) {
            this.getTvShowService.setTvItem( item );
        }
        this.location.path(view);
    }
}

dashboardCtrl.$inject = [  'getDashboardItems', 'config' , '$location' , 'getMovieService' , 'getTvShowService' ];

export default dashboardCtrl;