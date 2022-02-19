'use strict';

const apiKey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // DELETE BEFORE PUSHING TO REPO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const myCity = document.getElementById('my-city').value;
const stateCode = document.getElementById('state-code').value;
const countryCode = document.getElementById('country-code').value;
const resultLimit = 1;

async function getWeather() {
	///////////////////// take City, State and Country and get coordinates...
	let response = await fetch(
		`http://api.openweathermap.org/geo/1.0/direct?q=kalamazoo,mi,usa&limit=${resultLimit}&appid=${apiKey}`
	);
	const data = await response.json();
	console.log(data);
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

	/////////////// use weather data to display the current weather...
	const temp = Math.trunc(((weatherData.current.temp - 273.15) * 9) / 5 + 32);
	const weatherDescription = weatherData.current.weather[0].description;
	const icon = `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`;

	const html = `
	<div id="current-weather">
		<p>The weather is currently ${weatherDescription}.</p>
		<p>
			The weather in ${city} is currently ${temp} degrees
			fahrenheit.
		</p>
		<img src="${icon}" />
	</div>
	`;

	document
		.getElementById('current-weather-wrapper')
		.insertAdjacentHTML('afterbegin', html);
	return weatherData;
}
