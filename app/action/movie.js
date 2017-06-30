/*
	movie 中间件
*/


class Movie {
	constructor(options){
	}

	async index(ctx, next) {
		// ctx.body = '这是后台首页...';
		await ctx.render('movie/index', {
			title: '电影后台首页'
		});
	}
}

export default new Movie()

