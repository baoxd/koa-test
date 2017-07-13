/*
	movie 中间件
*/
import movieService from '../model/movie'
import commentService from '../model/comment'
import utils from '../util/utils'

class Movie {
	constructor(options){
	}

	/*
		电影首页
	*/
	async index (ctx) {
		let movieList = await movieService.findAll()

		await ctx.render('movie/index', {
			title: '电影后台首页',
			list: movieList
		});
	}

	/*
		电影列表
	*/
	async movielist(ctx){

		let list = await movieService.findAll()

		return await ctx.render('movie/movielist', {
			list: list
		})
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
		电影添加、
	*/
	async movieSave(ctx) {
		let movie = ctx.req.body.movie
		let file = ctx.req.file
		let msg = ''
		let flag = false

		if(!movie){
			return await ctx.render('error', {
				msg: '电影参数有误'
			})
		}

		// 文件上传
		if(file){
			try{
				utils.upload(file)
			}catch(e){
				console.log(e)
			}
		}
		// 添加
		if(!movie.id){
			let result = await movieService.addMovie(movie)
			
			if(result.affectedRows >=1){
				return await ctx.redirect('/movie/index') 
			}
			msg = '电影保存失败'
		}else{
			// 更新
			let result = await movieService.updateMovie(movie)
			// console.log(result)
			if(result && result.affectedRows >=1){
				return await ctx.redirect('/movie/movielist')
			}else{
				msg = '电影更新失败'
			}
		}

		return await ctx.render('error', {
			msg: msg
		})
	}

	/*
		查看电影详情
	*/
	async detail(ctx) {
		let id = ctx.params.id
		let _data = {}

		if(!id){
			return await ctx.render('error', {
				msg: '参数出错'
			})
		}

		let movie = await movieService.findMovieById(id)

		if(movie && movie.length > 0){
			_data.movie = movie[0]
			let comments = await commentService.findByMovieId(id)
			_data.comments = comments

			return await ctx.render('movie/detail', _data)
		}else{
			await ctx.render('error', {
				msg: '数据查询出错'
			})
		}
	}

	/*
		跳转到更新
	*/
	async goUpdateMovie(ctx){
		let id = ctx.params.id

		if(id){
			let movies = await movieService.findMovieById(id)
			
			if(movies && movies.length >0){
				await ctx.render('movie/add', {
					title: "电影更新",
					movie: movies[0]
				})
			}else{
				return await ctx.render('error', {
					msg: '查询电影出错'
				})
			}

		}else{
			return await ctx.render('error', {
				msg: '电影Id为空'
			})
		}
	}

	/*
		删除
	*/
	async deleteMovie(ctx) {
		let id = ctx.query.id

		if(id){
			let result = await movieService.deleteMovie(id)
			// console.log(result)
			if(result && result.affectedRows >0){
				ctx.body = {
					msg: true
				}
			}else{
				ctx.body = {
					msg: false
				}
			}
		}else{
			return await ctx.render('error', {
				msg: '电影Id为空'
			})
		}
	}

}

export default new Movie()

