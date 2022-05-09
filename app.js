'use strict';

const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();

const apiKey = process.env.API_KEY;
// const res = require('express/lib/response');
// const { json } = require('express/lib/response');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));

app.get('/', function (req, res) {
	console.log('hello?');
	res.render('currentWeather');
	res.send('hello from get request!');
});

// request(`${__dirname}/public`, function (error, response, body) {
// 	if (!error && response.statusCode == 200) {
// 		console.log('made request to index'); // Print the google web page.
// 	} else if (error) {
// 		console.log(error);
// 	}
// });

/*
function displayWeather() {
	app.post('/', function (req, res) {
		const myCity = document.getElementById('my-city').value;
		const stateCode = document.getElementById('state-code').value;
		const countryCode = document.getElementById('country-code').value;
		/////////// use these variables for testing:
		// const myCity = 'kalamazoo';
		// const stateCode = 'mi';
		// const countryCode = 'usa';
		const resultLimit = 1;
		const htmlTemplates = require('./htmlTemplates');

		///////////////////// take City, State and Country from HTML body and get coordinates...
		request(
			`http://api.openweathermap.org/geo/1.0/direct?q=${myCity},${stateCode},${countryCode}&limit=${resultLimit}&appid=${apiKey}`,
			function (err, respones, body) {
				if (err) {
					res.render('index', err);
					console.log(err);
				} else {
					const data = json.parse(body);
					console.log(data);
					return data;
				}
			}
		);
		const myCityLat = data[0].lat;
		const myCityLon = data[0].lon;

		//////////////////// send coordinates to get the weather...
		request(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${myCityLat}&lon=${myCityLon}&exclude=minutely,alerts&appid=${apiKey}`
		);
		return myWeather.json();
	});
}
/*

//////////// show the nav tabs:
function showForecastButtons() {
	document.getElementById('forecast-buttons').classList.remove('hidden');
	// console.log('Display the weather tabs.');
}

///////////////// DEFAULT display Current Weather- hide Hourly and One Week Weather:
function selectCurrentWeather() {
	document
		.getElementById('current-weather-wrapper')
		.classList.remove('hidden');
	document.getElementById('hourly-forecast-wrapper').classList.add('hidden');
	document
		.getElementById('one-week-forecast-wrapper')
		.classList.add('hidden');
	// console.log('Show just the currrent weather.');
}

/////////////////// display Hourly Weather- and hide Current and One Week Weather:
function selectHourlyWeather() {
	document
		.getElementById('hourly-forecast-wrapper')
		.classList.remove('hidden');
	document.getElementById('current-weather-wrapper').classList.add('hidden');
	document
		.getElementById('one-week-forecast-wrapper')
		.classList.add('hidden');
	// console.log('Show just the hourly weather.');
}

/////////////////////// display One Week Weather- and hide Current and Hourly Weather:
function selectWeekWeather() {
	document
		.getElementById('one-week-forecast-wrapper')
		.classList.remove('hidden');
	document.getElementById('current-weather-wrapper').classList.add('hidden');
	document.getElementById('hourly-forecast-wrapper').classList.add('hidden');
	// console.log('Show just the weeks weather');
}

///////////////////// adding event listeners to the buttons:
const getWeatherBtn = document.getElementById('get-weather-button');
const currWeatherBtn = document.getElementById('current-weather-btn');
const hourWeatherBtn = document.getElementById('hourly-weather-btn');
const weekWeatherBtn = document.getElementById('week-weather-btn');

getWeatherBtn.addEventListener('click', function () {
	showForecastButtons();
});
getWeatherBtn.addEventListener('click', function () {
	displayWeather();
});
currWeatherBtn.addEventListener('click', function () {
	selectCurrentWeather();
});
hourWeatherBtn.addEventListener('click', function () {
	selectHourlyWeather();
});
weekWeatherBtn.addEventListener('click', function () {
	selectWeekWeather();
});
*/

module.exports = app;
