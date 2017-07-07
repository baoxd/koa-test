import db from '../util/db'
import utils from '../util/utils'

class MovieService {

	constructor() {
		this.table = 'movie'
	}

	/*
		保存电影
	*/
	async addMovie(movie) {
		movie.id = utils.uuid()
		movie.createtime = Date.now()

		let result = await db.insertData(this.table, movie)
		return result
	}

	/*
		更新电影
	*/
	async updateMovie(movie) {
		let result = await db.updateData(this.table, movie, movie.id)
		return result
	}
}

export default new MovieService()