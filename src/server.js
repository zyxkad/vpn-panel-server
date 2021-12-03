
const {resolve, join} = require('path'); const PATH = resolve('.');
const config = require('./config');
const logger = require(PATH + '/utils/logger');
const express = require('express');

const WEB_DIR = join(PATH, 'webs');
const STATIC_DIR = join(WEB_DIR, 'static');

const app = express();

app.get('/', (req, res) => {
	res.sendFile(join(WEB_DIR, 'index.html'));
})

app.use('/static', express.static(STATIC_DIR));

function runServer(){
	const setting = config.get('webserver');

	const server = app.listen(setting.port, setting.address, ()=>{
		logger.info('WEB服务器已启动 [' + server.address().address + ':' + server.address().port + ']');
	});

	return server;
}

module.exports = {
	runServer
};

