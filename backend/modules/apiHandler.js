'use strict';

const axios = require('axios');
const app = require('../app');

// Use this variable only when testing; when live, apiKey is set to an environment variable in CPanel:
const apiKey = process.env.API_KEY;
// console.log(apiKey);

let weatherData;

console.log('hello from apiHandler');
// const myCity = document.getElementById('my-city').value;
// const stateCode = document.getElementById('state-code').value;
// const countryCode = document.getElementById('country-code').value;
/////////// use these variables for testing:
const myCity = 'kalamazoo';
const stateCode = 'mi';
const countryCode = 'usa';
const resultLimit = 1;

// let weatherData;

async function getWeather() {
	///////////////////// take City, State and Country from HTML body and get coordinates...
	let geoData;
	await axios
		.get(
			`http://api.openweathermap.org/geo/1.0/direct?q=${myCity},${stateCode},${countryCode}&limit=${resultLimit}&appid=${apiKey}`
		)
		.then((res) => {
			geoData = res.data;

			// console.log(geoData);
			// console.log(geoData[0].name);

			return geoData;
		})
		.catch((err) => {
			console.log('Error: ', err.message);
		});

	const myCityLat = geoData[0].lat;
	const myCityLon = geoData[0].lon;
	// console.log(myCityLat);
	// console.log(myCityLon);

	//////////////////// send coordinates to get the weather...
	axios
		.get(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${myCityLat}&lon=${myCityLon}&exclude=minutely,alerts&appid=${apiKey}`
		)
		.then((res) => {
			weatherData = res.data;
			console.log(
				`weatherData ${weatherData.current.weather[0].description} has been grabbed from API by apiHandler`
			);
			return weatherData;
		})
		.catch((err) => {
			console.log('Error: ', err.message);
		});

	console.log(
		`weatherData ${weatherData.current.weather[0].description} has been grabbed from API by apiHandler`
	); // <--- WHY IS THIS NOT WORKING

	return weatherData;
}

const weatherGreeting = 'This should have been weatherData';

module.exports = { getWeather, weatherData, weatherGreeting };

// async function displayWeather() {
// 	////////////////////////// first, wait for getWeather to finish executing:
// 	const weatherData = await getWeather();
// 	// console.log(weatherData.current.weather[0].description);
// 	/////////////// then use weatherData to display the current weather...
// 	const displayCurrWeather = function () {
// 		const currTemp = Math.trunc(
// 			((weatherData.current.temp - 273.15) * 9) / 5 + 32
// 		);
// 		const currWeatherDescription =
// 			weatherData.current.weather[0].description;
// 		const currIcon = `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`;
// 	};

// 	//////////////// then display the 24-hour weather...
// 	const displayHourlyWeather = function () {
// 		// for some reason the hourly data comes to us in reverse order, so I just unreverse it:
// 		const hourArray = weatherData.hourly.slice(0, 12).reverse();

// 		hourArray.forEach((data, i) => {
// 			const hourTimeStamp = hourArray[i].dt;
// 			const hour = new Date(hourTimeStamp * 1000).toLocaleString(
// 				'en-US',
// 				{ hour: 'numeric', hour12: true }
// 			);

// 			const hourlyTemp = Math.trunc(
// 				((hourArray[i].temp - 273.15) * 9) / 5 + 32
// 			);

// 			const hourlyWeatherDescription =
// 				hourArray[i].weather[0].description;
// 			const hourlyIcon = `http://openweathermap.org/img/wn/${hourArray[i].weather[0].icon}@2x.png`;
// 		});
// 	};

// 	///////////////// and finally display the weather for the week...
// 	const displayWeekWeather = function () {
// 		// for some reason the weeks data comes to us in reverse order, so I just unreverse it:
// 		const weekArray = weatherData.daily.reverse();

// 		weekArray.forEach((data, i) => {
// 			const dayTimeStamp = weekArray[i].dt;

// 			const dayOfWeek = new Date(dayTimeStamp * 1000).toLocaleString(
// 				'en-US',
// 				{ weekday: 'long' }
// 			);

// 			const dayTempHigh = Math.trunc(
// 				((weekArray[i].temp.max - 273.15) * 9) / 5 + 32
// 			);

// 			const dayTempLow = Math.trunc(
// 				((weekArray[i].temp.min - 273.15) * 9) / 5 + 32
// 			);

// 			const weekWeatherDescription =
// 				weekArray[i].weather[0].description;
// 			const weekIcon = `http://openweathermap.org/img/wn/${weekArray[i].weather[0].icon}@2x.png`;
// 		});
// 		return weatherData;
// 	};

// 	displayCurrWeather();
// 	displayHourlyWeather();
// 	displayWeekWeather();
