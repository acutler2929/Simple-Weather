'use strict';

const PRIVATE_KEY = 'meif903nj54ks89vs876qope32if4590'; // testing git secrets

const apiKey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // DELETE BEFORE PUSHING TO REPO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const myCity = document.getElementById('my-city').value;
const stateCode = document.getElementById('state-code').value;
const countryCode = document.getElementById('country-code').value;
const resultLimit = 1;

function displayWeather() {
	async function getWeather() {
		///////////////////// take City, State and Country and get coordinates...
		let response = await fetch(
			`http://api.openweathermap.org/geo/1.0/direct?q=kalamazoo,mi,usa&limit=${resultLimit}&appid=${apiKey}`
		);
		const data = await response.json();
		// console.log(data);
		const city = data[0].name;
		const myCityLat = data[0].lat;
		const myCityLon = data[0].lon;
		// console.log(myCityLat, myCityLon);

		//////////////////// send coordinates to get the weather...
		let myWeather = await fetch(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${myCityLat}&lon=${myCityLon}&exclude=minutely,alerts&appid=${apiKey}`
		);
		const weatherData = await myWeather.json();
		console.log(weatherData);
		return weatherData;
	}

	getWeather();

	/////////////// use weather data to display the current weather...
	const displayCurrWeather = function () {
		const currTemp = Math.trunc(
			((weatherData.current.temp - 273.15) * 9) / 5 + 32
		);
		const currWeatherDescription =
			weatherData.current.weather[0].description;
		const currIcon = `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`;

		const currentHtml = `
					<div id="current-weather">
					<p>
		The weather in ${city} is currently ${currWeatherDescription} at ${currTemp} &deg;F.
		</p>
		<img src="${currIcon}" />
		</div>
		`;

		document
			.getElementById('current-weather-wrapper')
			.insertAdjacentHTML('afterbegin', currentHtml);
	};

	//////////////// then display the 24-hour weather...
	const displayHourlyWeather = function (data, i) {
		const hourlyTemp = Math.trunc(
			((weatherData.hourly[i].temp - 273.15) * 9) / 5 + 32
		);
		const hourlyWeatherDescription =
			weatherData.hourly[i].weather[0].description;
		const hourlyIcon = `http://openweathermap.org/img/wn/${weatherData.hourly[i].weather[0].icon}@2x.png`;

		const hourlyHtml = `
		<div class="hourly-forecast">
		<p>
		HOURLY ${hourlyWeatherDescription} at ${hourlyTemp} &deg;F
		</p>
		<img class="hourly-img" src="${hourlyIcon}" />
		</div>
		`;

		weatherData.hourly.slice(0, 24).forEach(() => {
			document
				.getElementById('hourly-forecast-wrapper')
				.insertAdjacentHTML('afterbegin', hourlyHtml);
		});
	};

	///////////////// and finally display the weather for the week...
	const displayWeekWeather = function (data, i) {
		const weekTemp = Math.trunc(
			((weatherData.daily[i].temp - 273.15) * 9) / 5 + 32
		);
		const weekWeatherDescription =
			weatherData.daily[i].weather[0].description;
		const weekIcon = `http://openweathermap.org/img/wn/${weatherData.daily[i].weather[0].icon}@2x.png`;

		const weekHtml = `
			<div class="one-week-forecast">
			<p>
			ONE WEEK ${weekWeatherDescription} at ${weekTemp} &deg;F
			</p>
			<img class="one-week-img" src="${weekIcon}" />
			</div>
			`;

		weatherData.daily.forEach(() => {
			document
				.getElementById('one-week-forecast-wrapper')
				.insertAdjacentHTML('afterbegin', weekHtml);
		});
	};

	displayCurrWeather();
	displayHourlyWeather();
	displayWeekWeather();
}
