/*
	RateTvShow Controller
*/

class rateTvCtrl {

	constructor( rateTvService ,config , $http ,getTvService ) {

		this.config = config;
		this.$http = $http;
		this.getTvService = getTvService;
		this.tvItems = [];

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

	    rateTvService.getGenres().then((data) => {
	    	this.genresItems = data.data.genres;
		});

	    /*
			get item if navigation from dashboard
	    */

	    console.log(getTvService.tvItem);
		if (typeof getTvService.tvItem !== 'undefined') {
			this.tvItems.push(getTvService.tvItem);
		}	    

		/*
			use by ng-repeat to show random movie item
		*/
	    this.ramdomTvItem = function() {	
		    return Math.floor(Math.random() * (20 - 1 + 1)) + 1;
		}

    }

    /*
		on Dev
    */
	itemVote ( item, rate ) {
		let index = this.tvItems.indexOf(item); 
		this.tvItems.splice(index, 1);
		alert("thank you for rate, you won 1 coin");
	};


	/*
		API'S request to get tvItems
	*/
	requestTvItems() {

		let tvUrl = this.config.baseApiUrl + 'discover/tv?';
		this.tvItems = {};


		if ( typeof this.pref !== 'undefined' ) {

			if( typeof this.pref.year !== 'undefined' ) {
				tvUrl += 'first_air_date=' + this.pref.year + '&'; 
			}

			if( typeof this.pref.genre !== 'undefined' ) {
				tvUrl += 'with_genres=' + this.pref.genre + '&'; 
			}

			if( typeof this.pref.order !== 'undefined' ) {
				tvUrl += 'sort_by=' + this.pref.order + '&'; 
			}

			tvUrl += 'api_key='+this.config.apikey;
			console.log(tvUrl);

			let promise = this.$http.get( tvUrl )
				.success( (data) => {
					this.tvItems = data.results;
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

rateTvCtrl.$inject = [ 'rateTvService' , 'config' , '$http' , 'getTvShowService'];

export default rateTvCtrl;