/*
	user action
*/
import userService from '../model/user'

class User {
	constructor(options){
	}
	
	async goRegister(ctx) {
		await ctx.render('user/register', {
			title: '用户注册'
		})
	}

	async register(ctx) {
		let user = ctx.request.body.user

		if(user && user.name && user.password && user.role){
			let result = await userService.addUser(user)

			if(result && result.affectedRows >= 1){
				await ctx.redirect('/user/goLogin')
			}
		}else{
			await ctx.render('error', {
				msg: '请完善用户信息'
			})
		}
	}

	async goLogin(ctx) {
		await ctx.render('user/login', {
			title: '用户登录'
		})
	}

	/*
		登录
	*/
	async login(ctx) {
		let user = ctx.request.body.user

		if(!user || !user.name || !user.password){
			return await ctx.redirect('/user/goRegister')
		}

		let userInfo = await userService.findUserByLogin(user)

		if(userInfo){
			ctx.session.user = userInfo
			return await ctx.redirect('/user/userlist')
		}else{
			return await ctx.redirect('/user/goRegister')
		}
	}

	/*
		用户列表
	*/
	async userlist(ctx) {
		let userlist = await userService.findAll()

		if(userlist && userlist.length){
			return await ctx.render('user/userlist', {
				list: userlist,
				title: '用户列表'
			})
		}else{
			await ctx.render('error', {
				msg: '没有查询到用数据'
			})
		}
	}

	/*
		用户登出
	*/
	async logout(ctx) {
		delete ctx.session.user
		return await ctx.redirect('/user/goLogin')
	}

	/*
		登录验证
	*/
	async isLogin(ctx, next) {
		if(ctx.session.user){
			await next()
		}else{
			await ctx.render('error', {
				msg: '请先登录，再进行此操作'
			})
		}
	}

	/*
		管理员权限验证
	*/
	async isAdmin() {
		let user = ctx.session.user

		if(!user){
			await ctx.render('error', {
				msg: '请先登录，再进行此操作'
			})
		}else if(user.role != 1){
			await ctx.render('error', {
				msg: '您没有权限执行此操作'
			})
		}else{
			await next()
		}
	}
}

export default new User()