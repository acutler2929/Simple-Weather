'use strict';

const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();

const apiKey = require('./config.js');
const res = require('express/lib/response');
const { json } = require('express/lib/response');
console.log(apiKey);

app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.render('index');
});

// app.post('/', function (req, res) {
// 	const myCity = document.getElementById('my-city').value;
// 	const stateCode = document.getElementById('state-code').value;
// 	const countryCode = document.getElementById('country-code').value;
// 	/////////// use these variables for testing:
// 	// const myCity = 'kalamazoo';
// 	// const stateCode = 'mi';
// 	// const countryCode = 'usa';
// 	const resultLimit = 1;

// 	///////////////////// take City, State and Country from HTML body and get coordinates...
// 	request(
// 		`http://api.openweathermap.org/geo/1.0/direct?q=${myCity},${stateCode},${countryCode}&limit=${resultLimit}&appid=${apiKey}`,
// 		function (err, respones, body) {
// 			if (err) {
// 				res.render('index', err);
// 				console.log(err);
// 			} else {
// 				const data = json.parse(body);
// 				console.log('no error');
// 				console.log(data);
// 				return data;
// 			}
// 		}
// 	);
// 	const myCityLat = data[0].lat;
// 	const myCityLon = data[0].lon;

// 	//////////////////// send coordinates to get the weather...
// 	request(
// 		`https://api.openweathermap.org/data/2.5/onecall?lat=${myCityLat}&lon=${myCityLon}&exclude=minutely,alerts&appid=${apiKey}`
// 	);
// 	return myWeather.json();
// });

app.post('/', (req, res) => {
	res.send(`Full name is:${req.body.fname} ${req.body.lname}.`);
});

app.listen('8888', function () {
	console.log('Listening on 8888...');
});
