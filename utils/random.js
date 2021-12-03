
const {Base64} = require('js-base64');

module.exports = {
	randomBytes: function(len=1024){
		var bts = [];
		for(let i = 0;i < len;i++){
			bts.push(Math.floor(Math.random() * 256));
		}
		return Base64.encode(new Uint8Array(bts));
	}
}
