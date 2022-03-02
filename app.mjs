'use strict';

import * as config from './config.mjs';

import moment from './node_modules/moment';
moment().format();

window.displayWeather = function () {
	// const myCity = document.getElementById('my-city').value;
	// const stateCode = document.getElementById('state-code').value;
	// const countryCode = document.getElementById('country-code').value;
	/////////// use these variables for testing:
	const myCity = 'kalamazoo';
	const stateCode = 'mi';
	const countryCode = 'usa';
	const resultLimit = 1;

	///////////////////// take City, State and Country from HTML body and get coordinates...
	async function getWeather() {
		let response = await fetch(
			`http://api.openweathermap.org/geo/1.0/direct?q=${myCity},${stateCode},${countryCode}&limit=${resultLimit}&appid=${config.API_KEY}`
		);
		const data = await response.json();
		const myCityLat = data[0].lat;
		const myCityLon = data[0].lon;

		//////////////////// send coordinates to get the weather...
		let myWeather = await fetch(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${myCityLat}&lon=${myCityLon}&exclude=minutely,alerts&appid=${config.API_KEY}`
		);
		return myWeather.json();
	}

	////////////////////////// first, wait for getWeather to finish executing:
	(async () => {
		const weatherData = await getWeather();
		/////////////// then use weatherData to display the current weather...
		const displayCurrWeather = function () {
			const currTemp = Math.trunc(
				((weatherData.current.temp - 273.15) * 9) / 5 + 32
			);
			const currWeatherDescription =
				weatherData.current.weather[0].description;
			const currIcon = `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`;

			const currentHtml = `
			<div id="current-weather">
				<p id="current-weather-text">The weather in ${myCity} is currently ${currWeatherDescription} at ${currTemp} &deg;F.</p>
				<img id="current-weather-img" src="${currIcon}" />
				</div>
				`;

			document
				.getElementById('current-weather-wrapper')
				.insertAdjacentHTML('afterbegin', currentHtml);
			document
				.getElementById('current-weather')
				.classList.remove('hidden');
		};

		//////////////// then display the 24-hour weather...
		const displayHourlyWeather = function () {
			console.log(weatherData);

			weatherData.hourly.slice(0, 12).forEach((data, i) => {
				const timestamp = weatherData.hourly[i].dt;

				const hour = moment.unix(timestamp).format('hh');
				console.log(hour);
				// const hourAMPM = hello;
				// console.log(hourAMPM);

				const hourlyTemp = Math.trunc(
					((weatherData.hourly[i].temp - 273.15) * 9) / 5 + 32
				);
				const hourlyWeatherDescription =
					weatherData.hourly[i].weather[0].description;
				const hourlyIcon = `http://openweathermap.org/img/wn/${weatherData.hourly[i].weather[0].icon}@2x.png`;

				const hourlyHtml = `
					<div class="hourly-forecast">
						<p class="hourly-forecast-text">
						${hour} ${hourlyWeatherDescription} at ${hourlyTemp} &deg;F
						</p>
						<img class="hourly-img" src="${hourlyIcon}" />
					</div>
				`;

				document
					.getElementById('hourly-forecast-wrapper')
					.insertAdjacentHTML('afterbegin', hourlyHtml);
			});
		};

		///////////////// and finally display the weather for the week...
		const displayWeekWeather = function () {
			weatherData.daily.forEach((data, i) => {
				const weekTemp = Math.trunc(
					((weatherData.daily[i].temp.day - 273.15) * 9) / 5 + 32
				);
				const weekWeatherDescription =
					weatherData.daily[i].weather[0].description;
				const weekIcon = `http://openweathermap.org/img/wn/${weatherData.daily[i].weather[0].icon}@2x.png`;

				const weekHtml = `
			<div class="one-week-forecast">
			<p class="one-week-forecast-text">
			ONE WEEK ${weekWeatherDescription} at ${weekTemp} &deg;F
			</p>
			<img class="one-week-img" src="${weekIcon}" />
			</div>
			`;

				document
					.getElementById('one-week-forecast-wrapper')
					.insertAdjacentHTML('afterbegin', weekHtml);
			});
		};

		displayCurrWeather();
		displayHourlyWeather();
		displayWeekWeather();
	})();
};

//////////// show the nav tabs:
window.showWeatherTabs = function () {
	document.querySelector('nav').classList.remove('hidden');
	console.log('Display the weather tabs.');
};

///////////////// DEFAULT display Current Weather- hide Hourly and One Week Weather:
window.selectCurrentWeather = function () {
	document
		.getElementById('current-weather-wrapper')
		.classList.remove('hidden');
	document.getElementById('hourly-forecast-wrapper').classList.add('hidden'); // broken classList
	document
		.getElementById('one-week-forecast-wrapper')
		.classList.add('hidden');
	console.log('Show just the currrent weather.');
};

/////////////////// display Hourly Weather- and hide Current and One Week Weather:
window.selectHourlyWeather = function () {
	document
		.getElementById('hourly-forecast-wrapper')
		.classList.remove('hidden'); // broken classList
	document.getElementById('current-weather-wrapper').classList.add('hidden');
	document
		.getElementById('one-week-forecast-wrapper')
		.classList.add('hidden');
	console.log('Show just the hourly weather.');
};

/////////////////////// display One Week Weather- and hide Current and Hourly Weather:
window.selectWeekWeather = function () {
	document
		.getElementById('one-week-forecast-wrapper')
		.classList.remove('hidden'); // broken classList
	document.getElementById('current-weather-wrapper').classList.add('hidden');
	document.getElementById('hourly-forecast-wrapper').classList.add('hidden');
	console.log('Show just the weeks weather');
};
