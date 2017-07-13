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

	async findAll(){
		let _sql = `select * from ${this.table}`

		return await db.query(_sql)
	}
	
	async findMovieById(id){
		return await db.findDataById(this.table, id)
	}

	async deleteMovie(id){
		return await db.deleteDataById(this.table, id)
	}
}

export default new MovieService()