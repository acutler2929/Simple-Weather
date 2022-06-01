'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const apiHandler = require('./modules/apiHandler');
const dataHandler = require('./modules/dataHandler');
// const example = require('./example');
// console.log(example.hour);

const app = express();

console.log('hello from app.js!');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(express.static('../frontend'));

// First, location data is sent from frontend client.js to app.js, and location data is sent to apiHandler.js to make the api calls:
app.post('/getWeather', async (req, res) => {
	console.log('hello from app.js => getWeather!');

	// apiResponse comes back from api Handler...
	const apiResponse = await apiHandler.getWeather(
		req.body.myCity,
		req.body.stateCode,
		req.body.countryCode
	);

	// console.log(apiResponse);

	const dataPhrase = `it is currently ${apiResponse.weatherData.current.weather[0].description} in ${apiResponse.locationData.myCity}, ${apiResponse.locationData.stateCode}`;
	console.log(dataPhrase);

	// then we send apiResponse to dataHandler.js- htmlInserts come back from dataHandler.js and are then sent to the frontend client.js:
	const htmlInserts = await dataHandler.insertWeather(apiResponse);
	// console.log(
	// 	`it is currently ${htmlInserts.currData.currWeatherDescription}`
	// );
	// console.log(htmlInserts);

	res.send(htmlInserts);
});

module.exports = app;
