
const {initial} = require('./src/init');
const {runServer} = require('./src/server');
const {runSocketServer} = require('./src/socket');

(function(){
	initial();
	runServer();
	runSocketServer();
})();
