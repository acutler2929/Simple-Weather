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

app.use(express.static('../frontend'));

// app.get('/getWeather', (req, res) => {
// 	console.log('hello from app.js => getWeather!');
// 	app.get(apiHandler.apiHandler());
// 	const weatherData = apiHandler.weatherData;
// }).then(
// 	console.log(
// 		`weatherData ${weatherData.current.weather[0].description} has been returned from apiHandler`
// 	)
// );
// return weatherData;);

app.get('/getWeather', async (req, res) => {
	console.log('hello from app.js => getWeather!');
	app.get(apiHandler.apiHandler());
	const weatherData = await apiHandler.weatherData;

	// console.log(
	// 	`weatherData ${weatherData.current.weather[0].description} has been returned from apiHandler`
	// );
	// 	// return weatherData;
});

// app.post('/insertWeather', (req, res) => {
// 	console.log('hello from POST request');
// 	// console.log(req.body);
// 	// console.log(res.body);
// });
module.exports = app;
