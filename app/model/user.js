import db from '../util/db'
import utils from '../util/utils'

class UserService {

	constructor() {
		this.table = 'user'
	}

	// 添加用户
	async addUser(user) {
		user.id = utils.uuid()
		user.createtime = Date.now()

		let result = await db.insertData(this.table, user)
		return result
	}

	// 根据用户名、密码查询用户
	async findUserByLogin(user) {
		let _sql = `select * from ${this.table} 
						where name=${user.name} and password=${user.password} 
					limit 1`

		let result = await db.query(_sql)

		if(result.length >0){
			result = result[0]
		}

		return result;
	}

	// 查询所有用户
	async findAll() {
		let _sql = `select * from ${this.table}`
		let result = await db.query(_sql)
		return result
	}
}

export default new UserService()