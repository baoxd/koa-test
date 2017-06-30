import Router from 'koa-router';
import movieRouter from './movie';
let router = new Router();

router.use('/movie', movieRouter.routes(), movieRouter.allowedMethods())

export default router;
