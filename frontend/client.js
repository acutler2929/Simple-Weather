'use stirct';

//////////// "SUBMIT" button shows the nav tabs :
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

/////////////////// display the error message:
function displayError() {
	document
		.getElementById('one-week-forecast-wrapper')
		.classList.add('hidden');
	document.getElementById('current-weather-wrapper').classList.add('hidden');
	document.getElementById('hourly-forecast-wrapper').classList.add('hidden');
	document.getElementById('error-message').classList.remove('hidden');
	console.log('ERROR');
}

//////////////// building the function that inserts weather into the HTML:
function insertWeatherData(data) {
	// data = 'ERROR';
	function displayCurrWeather() {
		const currentHtml = data.currData;

		document
			.getElementById('current-weather-wrapper')
			.insertAdjacentHTML('afterbegin', currentHtml);
		document.getElementById('current-weather').classList.remove('hidden');
	}

	//////////////// then display the 24-hour weather...
	function displayHourlyWeather(data) {
		data.hourData.forEach((data) => {
			let hourlyHtml = data;

			document
				.getElementById('hourly-forecast-wrapper')
				.insertAdjacentHTML('afterbegin', hourlyHtml);
		});
	}

	///////////////// and finally display the weather for the week...
	function displayWeekWeather(data) {
		data.weekData.forEach((data) => {
			let weekHtml = data;

			document
				.getElementById('one-week-forecast-wrapper')
				.insertAdjacentHTML('afterbegin', weekHtml);
		});
	}

	////////////// check if error message is present. if it is, display it
	if (data.message === 'ERROR') {
		displayError();
	} else {
		showForecastButtons();
		displayCurrWeather(data);
		displayHourlyWeather(data);
		displayWeekWeather(data);
	}
}

//////////// click on submit, and grab weatherData from API call...
async function getWeather() {
	//////////////// "SUBMIT" button also clears any current weather messages before adding queried weather
	(function clearWeather() {
		console.log('clearWeather() has been called...');

		document.getElementById('current-weather-wrapper').innerHTML = '';
		document.getElementById('hourly-forecast-wrapper').innerHTML = '';
		document.getElementById('one-week-forecast-wrapper').innerHTML = '';
		document.getElementById('error-message').classList.add('hidden');
	})();

	/////////// request will be made up of City/State data entered in the form:
	const requestBody = {
		myCity: document.getElementById('my-city').value,
		stateCode: document.getElementById('state-code').value,
		countryCode: document.getElementById('country-code').value,
	};
	/////////// use this requestBody object for testing:
	// const requestBody = {
	// 	myCity: 'kalamazoo',
	// 	stateCode: 'mi',
	// 	countryCode: 'usa',
	// };
	console.log(requestBody);
	console.log('getWeather has been clicked');

	///////////////////// the we send a POST request to the backend...
	await fetch('/getWeather', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(requestBody),
	})
		//////////////// we store the response data in dataInserts...
		.then((res) => {
			console.log(res);
			const dataInserts = res.json();
			console.log(dataInserts);
			return dataInserts;
		})
		///////////// then we call insertWeatherData with dataInserts as the argument:
		.then((dataInserts) => {
			console.log(dataInserts);
			insertWeatherData(dataInserts);
		});
}

///////////////////// adding event listeners to the buttons:
const getWeatherBtn = document.getElementById('get-weather-button');
const currWeatherBtn = document.getElementById('current-weather-btn');
const hourWeatherBtn = document.getElementById('hourly-weather-btn');
const weekWeatherBtn = document.getElementById('week-weather-btn');

getWeatherBtn.addEventListener('click', function () {
	getWeather(), selectCurrentWeather();
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
