const logger = require('../../utils/logger')

const showMessage = async (socket,message) => {
    logger.warn(`[${socket.remoteAddress}]${JSON.stringify(message)}`)
}


module.exports= {
    showMessage
}