
const color = require('colors');

function getFormatTime(){
	let date = new Date();
	return (date.getFullYear() + '-' + new String(date.getMonth()).padStart(2, '0') +
		'-' + new String(date.getDate()).padStart(2, '0') + ' ' + new String(date.getHours()).padStart(2, '0') +
		':' + new String(date.getMinutes()).padStart(2, '0') + ':' + new String(date.getSeconds()).padStart(2, '0') +
		'.' + date.getMilliseconds());
}

module.exports = {
	debug(message) {
		console.log(color.green('[DEBUG]' + '[' + getFormatTime() + ']: ' + message));
	},
	info(message) {
		console.log(color.magenta('[INFO]') + '[' + getFormatTime() + ']: ' + message);
	},
	warn(message) {
		console.log(color.yellow('[WARN]' + '[' + getFormatTime() + ']: ' + message));
	}
}
