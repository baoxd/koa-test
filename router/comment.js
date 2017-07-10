import Router from 'koa-router'
import commentAction from '../app/action/comment'

let commentRouter = new Router()

commentRouter.post('/addComment', commentAction.addComment)

export default commentRouter