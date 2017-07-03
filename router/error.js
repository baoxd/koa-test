import Router from 'koa-router'

let errorRouter = new Router()

errorRouter.get('*', async (ctx) => {
	await ctx.render('error', {
		msg: '404! 请求路径不存在'
	})
})

export default errorRouter