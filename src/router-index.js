
'use strict';

const {resolve} = require('path'); const PATH = resolve('.');
const logger = require(PATH + '/utils/logger');
const express = require('express');

function createIndexRoute(){
	const router = express.Router();

	router.get('/', (req, res) => {
		res.render('index');
	})

	router.get('/dashboard', (req, res) => {
		const username = req.signedCookies['logged_user'];
		if(!username){
			res.redirect(302, '/');
			return;
		}
		res.render('dashboard', {username: username});
	})

	return router;
}

module.exports = {
	createIndexRoute
}
