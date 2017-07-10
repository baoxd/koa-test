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

}

export default new Movie()

