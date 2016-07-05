/*
	RateMovie Controller
*/

class rateMovieCtrl {

	constructor( rateMovieService ,config , $http ,getMovieService ) {

		this.config = config;
		this.$http = $http;
		this.getMovieService = getMovieService;
		this.movieItems = [];

		this.showPreferencesTitle = "Show search preferences";
	    this.showPreferences = true;

	    this.orderItems = [
	    	{ id:'popularity.desc', name:'Popularity Desc'},
	    	{ id:'popularity.asc', name:'Popularity Asc'},
	    	{ id:'revenue.desc', name:'Revenue Desc'},
	    	{ id:'revenue.asc', name:'Revenue Asc'},
	    	{ id:'vote_count.desc', name:'People Vote Desc'},
	    	{ id:'vote_count.asc', name:'People Vote Asc'},
	    	{ id:'vote_average.desc', name:'Vote Averange Desc'},
	    	{ id:'vote_average.asc', name:'Vote Averange Asc'},
	    ]

	    this.yearItems = [];
       	for (let i = 2016; i>=1900; i--) {
    		this.yearItems.push(i);
    	}

	    rateMovieService.getGenres().then((data) => {
	    	this.genresItems = data.data.genres;
		});

	    /*
			get item if navigation from dashboard
	    */
		if (typeof getMovieService.movieItem !== 'undefined') {
			this.movieItems.push(getMovieService.movieItem);
		}	    

		/*
			use by ng-repeat to show random movie item
		*/
	    this.ramdomMovieItem = function() {	
		    return Math.floor(Math.random() * (20 - 1 + 1)) + 1;
		}

    }

    /*
		on Dev
    */
	itemVote ( item, rate ) {
		let index = this.movieItems.indexOf(item); 
		this.movieItems.splice(index, 1);
		alert("thank you for rate, you won 1 coin");
	};


	/*
		API'S request to get movieitems
	*/
	requestMovieItems() {

		let movieUrl = this.config.baseApiUrl + 'discover/movie?';
		this.movieItems = {};


		if ( typeof this.pref !== 'undefined' ) {

			if( typeof this.pref.year !== 'undefined' ) {
				movieUrl += 'primary_release_year=' + this.pref.year + '&'; 
			}

			if( typeof this.pref.genre !== 'undefined' ) {
				movieUrl += 'with_genres=' + this.pref.genre + '&'; 
			}

			if( typeof this.pref.order !== 'undefined' ) {
				movieUrl += 'sort_by=' + this.pref.order + '&'; 
			}

			movieUrl += 'api_key='+this.config.apikey;
			console.log(movieUrl);

			let promise = this.$http.get( movieUrl )
				.success( (data) => {
					this.movieItems = data.results;
				})
				.error( (data) => {
					console.log(data);	
				})

		}	   	
	}

	toogleSearchOptions () {
		this.showPreferencesTitle = this.showPreferencesTitle === "Hide search preferences" ? "Show search preferences" : "Hide search preferences";
		this.showPreferences = this.showPreferences === false ? true: false;
	}

}

rateMovieCtrl.$inject = [ 'rateMovieService' , 'config' , '$http' , 'getMovieService'];

export default rateMovieCtrl;