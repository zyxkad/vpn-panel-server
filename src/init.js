
const {resolve} = require('path'); const PATH = resolve('.');
const config = require('./config');
const logger = require(PATH + '/utils/logger');

module.exports = {
	initial(){
		if(config.get('server') === undefined){
			config.set('debug', false)
			//设置服务器要监听的端口
			config.set('webserver.port', 8888)
			config.set('webserver.address','0.0.0.0')
			config.set('server.port', 6100)
			config.set('server.address','0.0.0.0')
			//设置系统内可编辑变量
			config.set('settings.net.timeout', 30000)//设置网络连接超时时间
			logger.info(`配置文件为空或不存在,已重新生成配置文件,请检查后重启程序`)
			process.exit(1)
		}else{
			logger.debug(`配置文件正常`)
		}
	}
}
