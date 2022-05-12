'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const apiHandler = require('./modules/apiHandler');
const insertWeather = require('./modules/insertWeather');

const app = express();

console.log('hello from app.js!');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));

app.get('/getWeather', (req, res) => {
	console.log('hello from app.js => getWeather!');
	app.get(apiHandler.apiHandler());
	const weatherData = apiHandler.weatherData;
	console.log(weatherData);
	app.post('/insertWeather', (req, res) => {
		console.log('hello from POST request');
		console.log(req.body);
		console.log(res.body);
	});
	// return weatherData;
});

module.exports = app;
