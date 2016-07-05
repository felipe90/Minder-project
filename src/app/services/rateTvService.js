/*
	rateTvService service
*/		

class rateTvService {

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
	getTvItem () {
		let index = Math.floor((Math.random() * 10) + 1);
		return this.tvData.data[index];
	}

	/*
		return promise
	*/
	requestGenresList () {
		let url = 'http://api.themoviedb.org/3/genre/tv/list?'+'api_key='+this.config.apikey;

		let promise = this.$http.get( url )
			.success(function (data) {
			 	return data; 
			})
			.error(function (data) {
				console.log(data);	
			});
	
		this.GenresData = promise;		
	}


	requestTvItems ( genreIndex ) {
	
		let movieUrl = this.config.baseApiUrl+'tv/popular?sort_by=popularity.desc&'+'api_key='+this.config.apikey;

		let promise = this.$http.get( movieUrl )
			.success(function (data) {
			 	return data; 
			})
			.error(function (data) {
				console.log(data);	
			});
	
		this.tvData = promise;
	}
}

rateTvService.$inject = [ '$http' , 'config'];

export default rateTvService;