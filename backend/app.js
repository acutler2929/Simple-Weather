'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const apiHandler = require('./modules/apiHandler');
const dataHandler = require('./modules/dataHandler');
const example = require('./example');
// console.log(example.hour);

const app = express();

// const myCity = 'kalamazoo';
// const stateCode = 'mi';
// const countryCode = 'usa';

console.log('hello from app.js!');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(express.static('../frontend'));

// First, location data is sent from frontend client.js to app.js, and location data is sent to apiHandler.js to make the api calls:
app.post('/getWeather', async (req, res) => {
	console.log('hello from app.js => getWeather!');
	console.log(req.body);
	// weatherData comes back from api Handler...
	const weatherData = await apiHandler.getWeather(
		req.body.myCity,
		req.body.stateCode,
		req.body.countryCode
	);
	const dataPhrase = `it is currently ${weatherData.current.weather[0].description} in ${req.body.myCity}, ${req.body.stateCode}`;
	console.log(dataPhrase);

	// then we send weatherData to dataHandler.js- htmlInserts come back from dataHandler.js and are then sent to the frontend client.js:
	const htmlInserts = await dataHandler.insertWeather(weatherData);
	console.log(`it is currently ${htmlInserts.currWeatherDescription}`);
	console.log(htmlInserts);
});

// app.post('/insertWeather', (req, res) => {
// 	// console.log(req.body);
// 	// console.log(res.body);
// 	console.log('hello from POST request');
// });
module.exports = app;
