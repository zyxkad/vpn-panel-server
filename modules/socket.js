//This file is used for communication with client
//OlderFox By 2021-11-13
//Ver 1.0 Beta
const logger = require('../utils/logger')
const config = require('../utils/config')
const manager = require('./manager')

const net = require('net')
const server = new net.createServer() //创建一个TCP服务器

//创建TCP监听服务器
const createServer = ()=>{
    const settings = config.get('server')
    //创建一个监听器
    server.listen(settings.port,settings.address,()=>{
        logger.info(`服务器运行在${settings.address}:${settings.port}`)
    })

    //处理客户端连接,在连接后弃置不管,等待客户端发送注册请求
    server.on('connection', (socket)=>{
        logger.info(`新客户端连接,地址[${socket.remoteAddress}:${socket.remotePort}]`)
        manager.newConnection(socket)//处理该链接信息
        server.getConnections((error,count)=>{
            logger.info(`当前总连接数:${count}`)
        })
    })

    server.on('error',async (e)=>{
        logger.debug(e)
        logger.info(`服务器发生内部错误,错误信息:${e.message}`)
        process.exit(1)
    })

    server.on('close',async ()=>{
        logger.debug(`服务器正常关闭.`)
    })
}

module.exports={
    createServer
}