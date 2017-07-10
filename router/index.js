import Router from 'koa-router';
import movieRouter from './movie';
import userRouter from './user'
import commentRouter from './comment'
import errorRouter from './error'
import moment from 'moment'

let router = new Router();

router.use('*', async (ctx, next) => {
	ctx.state.user = ctx.session.user
	ctx.state.moment = moment
	await next()
})

router.use('/movie', movieRouter.routes(), movieRouter.allowedMethods())
router.use('/user', userRouter.routes(), userRouter.allowedMethods())
router.use('/comment', commentRouter.routes(), commentRouter.allowedMethods())

// 404
router.use('*', errorRouter.routes(), errorRouter.allowedMethods())

export default router;
