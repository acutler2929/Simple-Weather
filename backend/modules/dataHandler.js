// const weatherData = require('./apiHandler');

console.log('hello from insertWeather!');

exports.insertWeather = async function (apiResponse) {
	console.log('function insertWeather called...');

	async function getCurrData(data) {
		// inserts for CURRENT weather
		const currWeatherDescription =
				data.weatherData.current.weather[0].description,
			currTemp = Math.trunc(
				((data.weatherData.current.temp - 273.15) * 9) / 5 + 32
			),
			currIcon = `http://openweathermap.org/img/wn/${data.weatherData.current.weather[0].icon}@2x.png`,
			myCity = data.locationData.myCity,
			currHtml = `
			<div id="current-weather" class="forecast-boxes">
				<p id="current-weather-text">The weather in ${myCity} is currently ${currWeatherDescription} at ${currTemp} &deg;F.</p>
				<img id="current-weather-img" src="${currIcon}" />
			</div>
			`;

		// console.log(currWeatherDescription); // <-- works just fine

		return currHtml;

		// return {
		// 	currWeatherDescription,
		// 	currTemp,
		// 	currIcon,
		// 	myCity,
		// 	currHtml,
		// };
	}

	async function getHourData(data) {
		const hourArray = data.weatherData.hourly.slice(0, 12);
		// console.log(hourArray);
		let hourTimeStamp = [];
		let hour = [];
		let hourlyWeatherDescription = [];
		let hourlyTemp = [];
		let hourlyIcon = [];
		let hourlyHtml = [];

		await hourArray.forEach((data, i) => {
			// console.log(data);
			hourTimeStamp.push(data.dt);
			hour.push(
				new Date(hourTimeStamp[i] * 1000).toLocaleString('en-US', {
					hour: 'numeric',
					hour12: true,
				})
			);
			hourlyWeatherDescription.push(data.weather[0].description);
			hourlyTemp.push(Math.trunc(((data.temp - 273.15) * 9) / 5 + 32));
			hourlyIcon.push(
				`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
			);
			hourlyHtml.push(`
				<div class="forecast-boxes hourly-forecast">
					<p class="hourly-forecast-text">
						${hour[i]} ${hourlyWeatherDescription[i]}<br> at ${hourlyTemp[i]} &deg;F
					</p>
					<img class="hourly-img" src="${hourlyIcon[i]}" />
				</div>
			`);

			return hourlyHtml;

			// return {
			// 	hour,
			// 	hourlyWeatherDescription,
			// 	hourlyTemp,
			// 	hourlyIcon,
			// 	hourlyHtml,
			// };
		});

		return hourlyHtml;

		// return {
		// 	hour,
		// 	hourlyWeatherDescription,
		// 	hourlyTemp,
		// 	hourlyIcon,
		// 	hourlyHtml,
		// };
	}

	async function getWeekData(data) {
		const weekArray = data.weatherData.daily;
		let dayTimeStamp = [];
		let dayOfWeek = [];
		let weekWeatherDescription = [];
		let dayTempHigh = [];
		let dayTempLow = [];
		let weekIcon = [];
		let weekHtml = [];

		// inserts for ONE WEEK weather
		await weekArray.forEach((data, i) => {
			dayTimeStamp.push(data.dt);
			dayOfWeek.push(
				new Date(dayTimeStamp[i] * 1000).toLocaleString('en-US', {
					weekday: 'long',
				})
			);
			weekWeatherDescription.push(data.weather[0].description);
			dayTempHigh.push(
				Math.trunc(((data.temp.max - 273.15) * 9) / 5 + 32)
			);
			dayTempLow.push(
				Math.trunc(((data.temp.min - 273.15) * 9) / 5 + 32)
			);
			weekIcon.push(
				`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
			);
			weekHtml.push(`
				<div class="forecast-boxes one-week-forecast">
					<p class="one-week-forecast-text">
						${dayOfWeek[i]} ${weekWeatherDescription[i]}<br> at ${dayTempHigh[i]} / ${dayTempLow[i]} &deg;F</p>
					<img class="one-week-img" src="${weekIcon[i]}" />
				</div>
			`);

			return weekHtml;

			// return {
			// 	dayOfWeek,
			// 	weekWeatherDescription,
			// 	dayTempHigh,
			// 	dayTempLow,
			// 	weekIcon,
			// 	weekHtml,
			// };
		});

		return weekHtml;

		// return {
		// 	dayOfWeek,
		// 	weekWeatherDescription,
		// 	dayTempHigh,
		// 	dayTempLow,
		// 	weekIcon,
		// 	weekHtml,
		// };
	}

	const currData = await getCurrData(apiResponse);
	const hourData = await getHourData(apiResponse);
	const weekData = await getWeekData(apiResponse);

	// RETURN the whole thing as an object

	return {
		currData,
		hourData,
		weekData,
	};
};
