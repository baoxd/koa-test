import Router from 'koa-router';
import movieAction from '../app/action/movie';

let movieRouter = new Router();

movieRouter.get("/index", movieAction.index);

export default movieRouter;
