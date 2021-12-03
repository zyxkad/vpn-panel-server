
//This file is used for communication with client
//OlderFox By 2021-11-13
//Ver 1.0 Beta


const {resolve} = require('path'); const PATH = resolve('.');
const logger = require(PATH + '/utils/logger');
const { Stick, MaxBodyLen } = require('@lvgithub/stick/index');
const { route, sender } = require('./process');
const config = require('./config');
const GLOBAL = require('./global');
const net = require('net');

//Accept new connection and process it
function newConnection(socket){
	const setting = config.get('settings.net');
	const stick = new Stick(1024);
	stick.setMaxBodyLen(MaxBodyLen['32K']);
	sender.setMaxListeners(5000);
	//init settings for this socket
	//set a number for wait client to register to server - default 30sec
	socket.setTimeout(setting.timeout);
	//let stick takeover the data
	socket.on('data', (data)=>{
		stick.putData(data);
	});

	//process data
	stick.onBody(async (data)=>{
		try {
			let message = JSON.parse(data.toString());
			socket.setTimeout(0);
			await route(message, socket);
		}catch(e){
			logger.warn('处理Json消息时发生错误:' + e);
		}
	});

	//服务端广播
	sender.on('broadcast', (info)=>{
		socket.write(stick.makeData(JSON.stringify(info)))
	});

	socket.on('close', (hadError)=>{
		if (hadError === false){
			logger.debug(`客户端[${socket.remoteAddress}:${socket.remotePort}]连接断开.`)
		}
		GLOBAL.server.online --;
		//TODO: 处理客户端断开后的解除注册-删除该客户端下的所有账号
	});

	socket.on('timeout', ()=>{
		logger.debug(`客户端[${socket.remoteAddress}:${socket.remotePort}]等待时间超时, 强制断开连接.`)
		socket.destroy(); //Destroy this socket
	});

	socket.on('error', (err)=>{
		logger.debug(`客户端[${socket.remoteAddress}:${socket.remotePort}]远端强制断开连接: ${err.message}`)
		socket.destroy(); //Destroy this socket
	});
}


//创建TCP监听服务器
function runSocketServer(){
	const setting = config.get('server');

	const server = new net.createServer(); //创建一个TCP服务器
	
	//创建一个监听器
	server.listen(setting.port, setting.address, ()=>{
		logger.info(`服务器已启动 [${setting.address}:${setting.port}]`);
	});

	//处理客户端连接,在连接后弃置不管,等待客户端发送注册请求
	server.on('connection', (socket)=>{
		logger.info(`新客户端[${socket.remoteAddress}:${socket.remotePort}]连接成功`);
		//处理该链接信息
		newConnection(socket);
		GLOBAL.server.online ++;
		logger.debug(`当前总连接数: ${GLOBAL.server.online}`);
	});

	server.on('error',async (e)=>{
		logger.debug(e);
		logger.info(`服务器发生内部错误: ${e.message}`);
		process.exit(1);
	});

	server.on('close',async ()=>{
		logger.debug(`服务器正常关闭.`);
	});

	return server;
}

module.exports = {
	runSocketServer
};
