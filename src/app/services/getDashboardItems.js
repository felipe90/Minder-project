/*
	getDashboarditems service
*/		

class getDashboarditems {

	constructor( $http, config ) {
		this.$http = $http;
		this.config = config;

		//get dashboacord items
		this.requestMovieItems();
		this.requestTvItems();	
	}

	/*
		return promise
	*/ 
	getMovieItems () {
		return this.movieData;
	}

	getTvItems () {
		return this.tvData;
	}

	requestMovieItems () {
	
		let tvUrl = this.config.baseApiUrl+'movie/popular?sort_by=popularity.desc&'+'api_key='+this.config.apikey;

		let promise = this.$http.get( tvUrl )
			.success(function (data) {
			 	return data; 
			})
			.error(function (data) {
				console.log(data);	
			});
	
		this.movieData = promise;
	}


	requestTvItems () {
	
		let tvUrl = this.config.baseApiUrl+'discover/tv?sort_by=popularity.desc&'+'api_key='+this.config.apikey;

		let promise = this.$http.get( tvUrl )
			.success(function (data) {
			 	return data; 
			})
			.error(function (data) {
				console.log(data);	
			});
	
		this.tvData = promise;
	}	
}

getDashboarditems.$inject = [ '$http' , 'config' ];

export default getDashboarditems;