/*
	getMoviesService
*/		

class getMovieService {

	constructor($http,config) {
		this.$http = $http;
		this.config = config;
	}

	setMovieItem (item) {
		this.movieItem = item;
	}
}

getMovieService.$inject = [ '$http' , 'config'];

export default getMovieService;