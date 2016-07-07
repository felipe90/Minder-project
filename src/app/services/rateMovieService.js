/*
	rateMovieService service
*/		

class rateMovieService {

	constructor( $http, config ) {
		this.$http = $http;
		this.config = config;

		//get dashboacord items
		this.requestGenresList();
	}

	/*
		return promise
	*/ 
	getGenres () {
		return this.GenresData;
	}

	/*
		return promise
	*/ 
	getMovieItem () {
		let index = Math.floor((Math.random() * 10) + 1);
		return this.movieData.data[index];
	}

	/*
		return promise
	*/
	requestGenresList () {
		let url = 'https://api.themoviedb.org/3/genre/movie/list?'+'api_key='+this.config.apikey;

		let promise = this.$http.get( url )
			.success(function (data) {
			 	return data; 
			})
			.error(function (data) {
				console.log(data);	
			});
	
		this.GenresData = promise;		
	}


	requestMovieItems ( genreIndex ) {
	
		let movieUrl = this.config.baseApiUrl+'movie/popular?sort_by=popularity.desc&'+'api_key='+this.config.apikey;

		let promise = this.$http.get( movieUrl )
			.success(function (data) {
			 	return data; 
			})
			.error(function (data) {
				console.log(data);	
			});
	
		this.movieData = promise;
	}
}

rateMovieService.$inject = [ '$http' , 'config' ];

export default rateMovieService;