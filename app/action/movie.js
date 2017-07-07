/*
	movie 中间件
*/
import movieService from '../model/movie'

class Movie {
	constructor(options){
	}

	/*
		电影首页
	*/
	async index (ctx) {
		// ctx.body = '这是后台首页...';
		await ctx.render('movie/index', {
			title: '电影后台首页'
		});
	}

	async goAddMovie(ctx) {
		return await ctx.render('movie/add', {
			title: '电影添加',
			movie: {
				title: "",
				doctor: "",
				country: "",
				language: "",
				year: "",
				type:"",
				flashpath:"",
				poster: "",
				summary: ""
			}
		})
	}

	/*
		电影添加
	*/
	async movieAdd(ctx) {
		let movie = ctx.req.body.movie

		if(!movie){
			return await ctx.render('error', {
				msg: '电影参数有误'
			})
		}

		// 添加
		if(!movie.id){
			let result = await movieService.addMovie(movie)
			console.log(result)
		}else{

		}
	}

}

export default new Movie()

