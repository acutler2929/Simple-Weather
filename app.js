'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const apiHandler = require('./modules/apiHandler');

const app = express();

// const res = require('express/lib/response');
// const { json } = require('express/lib/response');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));

app.get('/getWeather', (req, res) => {
	console.log('hello from app.js => getWeather!');
	app.use(apiHandler());
});

module.exports = app;
