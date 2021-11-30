const logger = require('../../utils/logger')

const showMessage = async (socket,message) => {
    logger.warn(`[${socket.remoteAddress}]${message.info}`)
}

const showVersion = async (socket,message)=>{
    logger.info(`[${socket.remoteAddress}]Client using version: ${message.version}`)
}


module.exports= {
    showMessage,
    showVersion
}