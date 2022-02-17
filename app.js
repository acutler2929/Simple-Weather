'use strict';

const apiKey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // DELETE ME !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function getWeather() {
	const myCity = document.getElementById('my-city').value;
	const stateCode = document.getElementById('state-code').value;
	const countryCode = document.getElementById('country-code').value;
	const resultLimit = 1;
	console.log(myCity);

	fetch(
		`http://api.openweathermap.org/geo/1.0/direct?q=${myCity},${stateCode},${countryCode}&limit=${resultLimit}&appid=${apiKey}`
	).then((response) => {
		const myLatLong = response.json();
		console.log(myLatLong);
		return myLatLong;
	});

	// return myWeather;
}
