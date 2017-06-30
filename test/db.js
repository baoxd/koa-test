// 数据库操作测试
import db from '../app/util/db'
import utils from '../app/util/utils'
import {expect} from 'chai'

describe('/app/util/db.js', () => {

	let table = 'user'
	let userId = '123qwe'

	it('数据库添加 -- insertData', (done) => {
		
		let values = {
			id: userId,
			password: 'test',
			name: 'test',
			role: 1,
			createtime: Date.now()
		}

		db.insertData(table, values).then((_data) => {
			expect(_data.affectedRows).to.be.equal(1)
			done()
		}, (err) => {
			expect(err.errno).to.be.an('number')
			done()
		});
	})

	it('根据id查询 -- findDataById', (done) => {

		db.findDataById(table, userId).then((_datas) => {
			expect(_datas[0].id).to.be.equal(userId)
			done()
		}, (err) => {
			expect(err.errno).to.be.an('number')
			done()
		})
	})

	it('更新数据 -- updateData', (done) => {
		let values = {
			password: '1234',
			name: '1234',
			role: 2,
			createtime: Date.now()
		}

		db.updateData(table, values, userId).then((_data) => {
			expect(_data.affectedRows).to.be.equal(1)
			done()
		}, (err) => {
			expect(err.errno).to.be.an('number')
			done()
		})
	})

	it('条数统计 -- count', (done) => {

		db.count(table).then((_data) => {
			expect(_data[0].total_count).to.be.an('number')
			done()
		}, (err) => {
			expect(err.errno).to.be.an('number')
			done()
		})
	})

	it('部分字段查询 -- select', (done) => {

		let keys = ['name', 'role']

		db.select(table, keys).then((_data) => {
			expect(_data.length).to.be.an('number')
			done()
		}, (err) => {
			expect(err.errno).to.be.an('number')
			done()
		})
	})

	it('删除数据 -- deleteDataById', (done) => {

		db.deleteDataById(table, userId).then((_data) => {
			expect(_data.affectedRows).to.be.equal(1)
			done()
		}, (err) => {
			expect(err.errno).to.be.an('number')
			done()
		})
	})

});

