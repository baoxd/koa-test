import db from '../util/db'
import utils from '../util/utils'

class CommentService {

	constructor(){
		this.table = 'comments'
	}

	async findByMovieId(movieId){
		let _sql = `select * from ${this.table} where movieid = ?`
		return await db.query(_sql, [movieId])
	}

	async addComment(comment){
		comment.id = utils.uuid()
		comment.createtime = Date.now()

		return await db.insertData(this.table, comment)
	}
}

export default new CommentService()