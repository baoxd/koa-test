import 'babel-polyfill';
import Koa from 'koa';
import path from 'path';
import router from './router/index';
import bodyParser from 'koa-bodyparser';
import koastatic from 'koa-static';
import session from 'koa-session-minimal';
import MysqlSession from 'koa-mysql-session';
import views from 'koa-views';
import config from './config';


const app = new Koa();
const staticPath = './public';

// 加载模板引擎
app.use(views(path.join(__dirname, './app/views'), {
	extension: 'ejs'
}));

app.use(bodyParser());

// 设置session
let store = new MysqlSession({
	user: 'root',
	password: '1234',
	database: 'koa',
	host: 'localhost',
});

// 存放sessionId的cookie配置
let cookie = {
	maxAge: 86400000,
	// expires: '',
	path: '/',
	domain: '',
	httpOnly: '',
	overwrite: '',
	secure: '',
	sameSite: '',
	signed: ''
};

app.use(session({
	key: 'SESSION_ID',
	store: store,
	cookie: cookie
}));

app.use(koastatic(
  path.join( __dirname,  staticPath)
));

app.use(router.routes()).use(router.allowedMethods());


app.listen(config.port);
console.log('Server has started: http://localhost:3000/');

export default app;
