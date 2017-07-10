import Router from 'koa-router'
import movieAction from '../app/action/movie'
import userAction from '../app/action/user'
import multer from 'koa-multer'
import path from 'path'

let movieRouter = new Router();

const upload = multer({ dest: path.join(__dirname, '../', 'public/upload') });

movieRouter.get("/index", movieAction.index)
		   .get("/goAddMovie", userAction.isAdmin, movieAction.goAddMovie)
		   .post("/movieSave", userAction.isAdmin, upload.single('uploadPoster'), movieAction.movieSave)
		   .get("/detail/:id", movieAction.detail)

export default movieRouter;
