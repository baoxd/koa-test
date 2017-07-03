import Router from 'koa-router'
import userAction from '../app/action/user'

let userRouter = new Router()

userRouter.get('/goRegister', userAction.goRegister)
		  .post('/register', userAction.register)
		  .get('/goLogin', userAction.goLogin)
		  .post('/login', userAction.login)
		  .get('/userlist', userAction.isLogin, userAction.userlist)
		  .get('/logout', userAction.logout)

export default userRouter