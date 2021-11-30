const logger = require('../../utils/logger')

const showMessage = async (socket,message) => {
    logger.warn(`[${socket.remoteAddress}]${message}`)
}


module.exports= {
    showMessage
}