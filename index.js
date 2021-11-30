const {initial} = require('./utils/init')
const {createServer} = require('./modules/socket')

function main (){
    initial()
    createServer()
}
main()