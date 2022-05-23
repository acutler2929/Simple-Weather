'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const apiHandler = require('./modules/apiHandler');
// const insertWeather = require('./modules/insertWeather');
// const example = require('./example');

const app = express();

// const myCity = 'kalamazoo';
// const stateCode = 'mi';
// const countryCode = 'usa';

console.log('hello from app.js!');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(express.static('../frontend'));

// console.log(example.fName);

app.post('/getWeather', async (req, res) => {
	console.log('hello from app.js => getWeather!');
	console.log(req.body);

	const weatherData = await apiHandler.getWeather(
		req.body.myCity,
		req.body.stateCode,
		req.body.countryCode
	);
	console.log(weatherData.current);
	const dataPhrase = `it is currently ${weatherData.current.weather[0].description} in ${req.body.myCity}, ${req.body.stateCode}`;
	console.log(dataPhrase);

	// return weatherData;
});

// app.post('/insertWeather', (req, res) => {
// 	// console.log(req.body);
// 	// console.log(res.body);
// 	console.log('hello from POST request');
// });
module.exports = app;
