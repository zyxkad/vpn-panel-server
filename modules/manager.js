//this file is for manage the clients.
//olderFox 2021-11-26
//Version 1.0
const logger = require('../utils/logger')
const config = require('../utils/config').get('settings.net')
const { Stick, MaxBodyLen } = require('@lvgithub/stick/index');

//Accept new connection and process it
function newConnection (socket){
    const stick = new Stick(1024);
    stick.setMaxBodyLen(MaxBodyLen['32K']);
    //init settings for this socket
    //set a number for wait client to register to server - default 30sec
    socket.setTimeout(config.timeout)
    //let stick takeover the data
    socket.on('data',(data)=>{
        stick.putData(data)
    })

    //process data
    stick.onBody(async (data)=>{
        logger.info(data.toString())
    })

    socket.on('close',(hadError)=>{
        if (hadError === false){
            logger.debug(`客户端[${socket.remoteAddress}:${socket.remotePort}]连接断开.`)
        }
        //TODO:处理客户端断开后的解除注册
    })

    socket.on('timeout',()=>{
        logger.debug(`客户端[${socket.remoteAddress}:${socket.remotePort}]等待时间超时,强制断开连接.`)
        socket.destroy()  //Destroy this socket
    })

    socket.on('error',(err)=>{
        logger.debug(`客户端[${socket.remoteAddress}:${socket.remotePort}]远端强制断开连接,回执:${err.message}`)
        socket.destroy()//Destroy this socket
    })
}

module.exports ={
    newConnection
}