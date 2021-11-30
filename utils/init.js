const config = require('./config')
const logger = require('./logger')

module.exports={
    initial(){
        if(config.get('configInfo.version') === undefined){
            //版本相关设置
            config.set('configInfo.debug',true)
            config.set('configInfo.version','1.0.0')
            //设置服务器要监听的端口
            config.set('server.port',6100)
            config.set('server.address','0.0.0.0')
            //设置系统内可编辑变量
            config.set('settings.net.timeout',30000)//设置网络连接超时时间
            logger.info(`配置文件为空或不存在,已重新生成配置文件,请检查后重启程序`)
            process.exit(1)
        }else{
            logger.debug(`配置文件正常`)
        }
    }
}