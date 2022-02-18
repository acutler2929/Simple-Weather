'use strict';

const apiKey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // DELETE ME !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const myCity = document.getElementById('my-city').value;
const stateCode = document.getElementById('state-code').value;
const countryCode = document.getElementById('country-code').value;
const resultLimit = 1;

async function getWeather() {
	let response = await fetch(
		`http://api.openweathermap.org/geo/1.0/direct?q=kalamazoo,mi,usa&limit=${resultLimit}&appid=${apiKey}`
	);
	const data = await response.json();
	console.log(data);
	const myCityLat = data[0].lat;
	const myCityLon = data[0].lon;
	console.log(myCityLat, myCityLon);

	let myWeather = await fetch(
		`https://api.openweathermap.org/data/2.5/onecall?lat=${myCityLat}&lon=${myCityLon}&exclude=minutely,alerts&appid=${apiKey}`
	);
	const weatherData = await myWeather.json();
	console.log(weatherData);
}
