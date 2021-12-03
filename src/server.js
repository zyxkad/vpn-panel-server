
const {resolve, join} = require('path'); const PATH = resolve('.');
const logger = require(PATH + '/utils/logger');
const random = require(PATH + '/utils/random');
const config = require('./config');
const {createApiRoute} = require('./router-api');
const {createIndexRoute} = require('./router-index');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const WEB_DIR = join(PATH, 'webs');
const STATIC_DIR = join(WEB_DIR, 'static');

const app = express();

function runServer(){
	const setting = config.get('webserver');

	const COOKIE_SECRET = random.randomBytes(1024);

	app.set('views', './webs');
	app.set('view engine', 'html');
	app.engine('html', ejs.renderFile);

	app.use(cookieParser(COOKIE_SECRET), bodyParser.json(), bodyParser.urlencoded({extended:true}));
	app.use('/', createIndexRoute());
	app.use('/static', express.static(STATIC_DIR));
	app.use('/api', createApiRoute());

	const server = app.listen(setting.port, setting.address, ()=>{
		logger.info('WEB服务器已启动 [' + server.address().address + ':' + server.address().port + ']');
	});

	return server;
}

module.exports = {
	runServer
};

