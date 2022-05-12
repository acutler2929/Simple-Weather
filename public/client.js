'use stirct';

//////////// show the nav tabs:
function showForecastButtons() {
	document.getElementById('forecast-buttons').classList.remove('hidden');
	document
		.getElementById('current-weather-wrapper')
		.classList.remove('hidden');
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
	getWeather();
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

//////////////// building the function that inserts weather into the HTML:
function insertWeatherData(weatherData) {
	function displayCurrWeather() {
		// console.log(weatherData);
		const currTemp = Math.trunc(
			((weatherData.current.temp - 273.15) * 9) / 5 + 32
		);
		const currWeatherDescription =
			weatherData.current.weather[0].description;
		const currIcon = `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`;

		const currentHtml = `
				<div id="current-weather" class="forecast-boxes">
					<p id="current-weather-text">The weather in ${myCity} is currently ${currWeatherDescription} at ${currTemp} &deg;F.</p>
					<img id="current-weather-img" src="${currIcon}" />
				</div>
				`;

		document
			.getElementById('current-weather-wrapper')
			.insertAdjacentHTML('afterbegin', currentHtml);
		document.getElementById('current-weather').classList.remove('hidden');
	}

	//////////////// then display the 24-hour weather...
	function displayHourlyWeather() {
		// for some reason the hourly data comes to us in reverse order, so I just unreverse it:
		const hourArray = weatherData.hourly.slice(0, 12).reverse();

		hourArray.forEach((data, i) => {
			const hourTimeStamp = hourArray[i].dt;
			const hour = new Date(hourTimeStamp * 1000).toLocaleString(
				'en-US',
				{ hour: 'numeric', hour12: true }
			);

			const hourlyTemp = Math.trunc(
				((hourArray[i].temp - 273.15) * 9) / 5 + 32
			);
			const hourlyWeatherDescription =
				hourArray[i].weather[0].description;
			const hourlyIcon = `http://openweathermap.org/img/wn/${hourArray[i].weather[0].icon}@2x.png`;

			const hourlyHtml = `
					<div class="forecast-boxes hourly-forecast">
						<p class="hourly-forecast-text">
						${hour} ${hourlyWeatherDescription}<br> at ${hourlyTemp} &deg;F
						</p>
						<img class="hourly-img" src="${hourlyIcon}" />
					</div>
					`;

			document
				.getElementById('hourly-forecast-wrapper')
				.insertAdjacentHTML('afterbegin', hourlyHtml);
		});
	}

	///////////////// and finally display the weather for the week...
	function displayWeekWeather() {
		// for some reason the weeks data comes to us in reverse order, so I just unreverse it:
		const weekArray = weatherData.daily.reverse();

		weekArray.forEach((data, i) => {
			const dayTimeStamp = weekArray[i].dt;

			const dayOfWeek = new Date(dayTimeStamp * 1000).toLocaleString(
				'en-US',
				{ weekday: 'long' }
			);
			// console.log(dayTimeStamp);
			// console.log(dayOfWeek);

			const dayTempHigh = Math.trunc(
				((weekArray[i].temp.max - 273.15) * 9) / 5 + 32
			);

			const dayTempLow = Math.trunc(
				((weekArray[i].temp.min - 273.15) * 9) / 5 + 32
			);

			const weekWeatherDescription = weekArray[i].weather[0].description;
			const weekIcon = `http://openweathermap.org/img/wn/${weekArray[i].weather[0].icon}@2x.png`;

			const weekHtml = `
					<div class="forecast-boxes one-week-forecast">
					<p class="one-week-forecast-text">
						${dayOfWeek} ${weekWeatherDescription}<br> at ${dayTempHigh} / ${dayTempLow} &deg;F</p>
						<img class="one-week-img" src="${weekIcon}" />
					</div>
				`;

			document
				.getElementById('one-week-forecast-wrapper')
				.insertAdjacentHTML('afterbegin', weekHtml);
		});
	}

	displayCurrWeather();
	displayHourlyWeather();
	displayWeekWeather();
}

//////////// click on submit, and grab weatherData from API call...
async function getWeather() {
	console.log('getWeather has been clicked');
	await fetch('/getWeather', { method: 'GET' });
	console.log('weather has been fetched');
	insertWeatherData();
}
