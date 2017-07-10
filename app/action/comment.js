import commentService from '../model/comment'

class Comment {

	constructor(options){
	}

	/*
		添加评论
	*/
	async addComment(ctx) {
		let comment = ctx.request.body.comment

		if(comment.movieid && comment.content && comment.userid){
			let result = await commentService.addComment(comment)
			console.log(result)
			if(result && result.affectedRows>=1){
				await ctx.redirect('/movie/detail/' + comment.movieid)
			}else{
				await ctx.render('error', {
					msg: '评论添加出错'
				})
			}
		}else{
			await ctx.render('error', {
				msg: '评论参数有误'
			})
		}
	}
}

export default new Comment()