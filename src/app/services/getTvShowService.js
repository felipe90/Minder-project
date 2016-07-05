/*
	getTvShowsService service
*/		

class getTvShowService {

	constructor($http,config) {
		this.$http = $http;
		this.config = config;
	}

	setTvItem (item) {
		this.tvItem = item;
	}

}

getTvShowService.$inject = [ '$http' , 'config'];

export default getTvShowService;