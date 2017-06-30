import config from '../../config'
import mysql from 'mysql';

let database = config.database

const pool = mysql.createPool({
	host	 : database.HOST,
	user 	 : database.USER,
	password : database.PASSWORD,
	database : database.DATABASE,
})

let query = (sql, values) => {
	return new Promise(function(resolve, reject){
		pool.getConnection(function(err, connection){
			if(err){
				reject(err)
			}else{
				connection.query(sql, values, function(err, rows){
					if(err){
						reject(err)
					}else{
						resolve(rows)
					}
					connection.release()
				})
			}
		})
	})
}

/*
	插入数据
*/
let insertData = (table, values) => {
	let _sql = 'insert into ?? set ?';
	return query(_sql, [table, values])
}

let findDataById = (table, id) => {
	let _sql = 'select * from ?? where id = ?'
	return query(_sql, [table, id])
}

let updateData = (table, values, id) => {
	let _sql = 'update ?? set ? where id = ?'
	return query(_sql, [table, values, id])
}

let count = (table) => {
	let _sql = 'select count(*) as total_count from ??'
	return query(_sql, [table])
}

let select = (table, keys) => {
	let _sql = 'select ?? from ??'
	return query(_sql, [keys, table])
}

let deleteDataById = (table, id) => {
	let _sql = 'delete from ?? where id = ?'
	return query(_sql, [table, id])
}

export default {
	query,
	insertData,
	findDataById,
	updateData,
	count,
	select,
	deleteDataById
}