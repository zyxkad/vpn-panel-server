
'use strict';

const {resolve} = require('path'); const PATH = resolve('.');
const logger = require(PATH + '/utils/logger');
const GLOBAL = require('./global');
const express = require('express');

function registerFrontApi(router){
	router.post('/login', (req, res)=>{
		const {username, password, remember} = req.body;
		if(!username || !password){
			res.json({
				'status': 'error',
				'error': 'IllegalDataError',
				'errorMessage': 'Username or password is illegal data.'
			});
			return;
		}
		if(!(username === 'admin' && password === '466aaf2c87dc07124712dbd9c4f9780c140fe7600f049d4688210c8e5f5aa16c'/* admi730 */)){
			logger.debug(username, 'try log with wrong password', password);
			res.json({
				'status': 'error',
				'error': 'PasswordError'
			});
			return;
		}
		res.cookie('logged_user', username, {'maxAge': (remember ?1000 * 60 * 60 * 24 * 7 :0), 'signed': true, 'httpOnly': true});
		res.json({'status': 'ok'});
	});

	router.post('/logout', (req, res)=>{
		if(!(req.signedCookies['logged_user'])){
			res.status(403).end();
			return;
		}
		res.clearCookie('logged_user');
		res.json({'status': 'ok'});
	});

	router.get('/dashboard/data', (req, res)=>{
		res.json({
			'status': 'ok',
			'server': {
				'total': GLOBAL.server.total,
				'online': GLOBAL.server.online
			},
			'user': {
				'total': GLOBAL.user.total,
				'online': GLOBAL.user.online
			}
		})
	});
}

function registerNodeApi(router0){
	const router = express.Router();

	router.get('/version', (req, res)=>{
		res.json({
			'status': 'ok',
			'version': '0.1.0',
			'lastmod': '2021-12-12 23:59:59 +0000',
			'url': {
				'windows': '/static/node/node-windows-v0.1.0.exe',
				'linux': '/static/node/node-linux-v0.1.0.exe',
				'macos': '/static/node/node-macos-v0.1.0.exe'
			}
		})
	});

	router0.use('/node', router);
	return router;
}

function createApiRoute(){
	const router = express.Router();

	registerFrontApi(router);
	registerNodeApi(router);

	return router;
}

module.exports = {
	createApiRoute
}
