
const {resolve} = require('path'); const PATH = resolve('.');
const logger = require(PATH + '/utils/logger');
const events = require('events');
const sender = new events.EventEmitter();

async function showMessage(socket, message){
	logger.warn(`[${socket.remoteAddress}]${message.info}`);
}

async function showVersion(socket, message){
	logger.info(`[${socket.remoteAddress}]Client using version: ${message.version}`);
}

//处理所有发送到服务端的消息
const route = async (message, socket) => {
	switch(message.target){
		case 'broadcast':{ //对所有客户端进行消息广播
			sender.emit('broadcast',message.info);
		}break;
		case 'register':{
			//TODO:处理注册事件
		}break;
		case 'getPSK':{
			//TODO:处理从客户端获取到的PSK信息
		}break;
		case 'userList':{
			//TODO:处理从客户端获取到的用户列表
		}break;
		case 'report':{
		//TODO:处理客户端发来的综合报告,需要将其存储到数据库中
		}break;
		case 'message':{
			await showMessage(socket, message);
		}break;
		case 'version':{
			await showVersion(socket, message);
		}break;
	}
};

module.exports = {
	route,
	sender
};
