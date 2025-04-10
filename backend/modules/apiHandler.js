'use strict';

const axios = require('axios');
const app = require('../app');

// Use this variable only when testing; when live, apiKey is set to an environment variable in CPanel:
// const apiKey = process.env.API_KEY;
// paste api from your notes into a string variable here

console.log('hello from apiHandler!');

const resultLimit = 1;

exports.getWeather = async function (city, state, country) {
	///////////////////// take City, State and Country from HTML body and get coordinates...
	let geoData;
	let locationData;
	let weatherData;

	await axios
		.get(
			`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=${resultLimit}&appid=${apiKey}`
		)
		.then((res) => {
			geoData = res.data;

			locationData = {
				myCity: city,
				stateCode: state,
				countryCode: country,
				myCityLat: geoData[0].lat,
				myCityLon: geoData[0].lon,
			};

			return locationData;
		})
		.catch((err) => {
			console.log('Error: ', err.message);
			console.log('INVALID GEODATA');
		});

	if (locationData === undefined) {
		console.log('returning "ERROR"');
		return { message: 'ERROR' };
	} else {
		//////////////////// send coordinates to get the weather...
		await axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?lat=${locationData.myCityLat}&lon=${locationData.myCityLon}&appid=${apiKey}`
			)
			.then((res) => {
				weatherData = res.data;
				// console.log(
				// 	`weatherData ${weatherData.current.weather[0].description} has been grabbed from API by apiHandler`
				// );
				return weatherData;
			})
			.catch((err) => {
				console.log('Error: ', err.message);
			});

		return { locationData, weatherData };
	}
};
