// const weatherData = require('./apiHandler');

console.log('hello from insertWeather!');

exports.insertWeather = async function (weatherData) {
	console.log('function insertWeather called...');

	async function getCurrData(data) {
		// inserts for CURRENT weather
		const currWeatherDescription = data.current.weather[0].description,
			currTemp = Math.trunc(((data.current.temp - 273.15) * 9) / 5 + 32),
			currIcon = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;

		// console.log(currWeatherDescription); // <-- works just fine

		return {
			currWeatherDescription,
			currTemp,
			currIcon,
		};
	}

	async function getHourData(data) {
		const hourArray = data.hourly.slice(0, 12);
		// console.log(hourArray);
		let hourTimeStamp = [];
		let hour = [];
		let hourlyWeatherDescription = [];
		let hourlyTemp = [];
		let hourlyIcon = [];
		let hourlyHtml = `
			<div class="forecast-boxes hourly-forecast">
				<p class="hourly-forecast-text">
					${hour} ${hourlyWeatherDescription}<br> at ${hourlyTemp} &deg;F
				</p>
				<img class="hourly-img" src="${hourlyIcon}" />
			</div>
		`;

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

			return {
				hour,
				hourlyWeatherDescription,
				hourlyTemp,
				hourlyIcon,
				hourlyHtml,
			};
		});

		return {
			hour,
			hourlyWeatherDescription,
			hourlyTemp,
			hourlyIcon,
			hourlyHtml,
		};
	}

	async function getWeekData(data) {
		const weekArray = data.daily;
		let dayTimeStamp = [];
		let dayOfWeek = [];
		let weekWeatherDescription = [];
		let dayTempHigh = [];
		let dayTempLow = [];
		let weekIcon = [];
		let weekHtml = `
			<div class="forecast-boxes one-week-forecast">
				<p class="one-week-forecast-text">
					${dayOfWeek} ${weekWeatherDescription}<br> at ${dayTempHigh} / ${dayTempLow} &deg;F</p>
				<img class="one-week-img" src="${weekIcon}" />
			</div>
		`;

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

			return {
				dayOfWeek,
				weekWeatherDescription,
				dayTempHigh,
				dayTempLow,
				weekIcon,
				weekHtml,
			};
		});

		return {
			dayOfWeek,
			weekWeatherDescription,
			dayTempHigh,
			dayTempLow,
			weekIcon,
			weekHtml,
		};
	}

	const currData = await getCurrData(weatherData);
	const hourData = await getHourData(weatherData);
	const weekData = await getWeekData(weatherData);

	// RETURN the whole thing as an object

	return {
		currData,
		hourData,
		weekData,
	};

	// return {
	// 	currWeatherDescription,
	// 	currTemp,
	// 	currIcon,
	// 	hour,
	// 	hourlyWeatherDescription,
	// 	dayOfWeek,
	// };
};

// module.exports = (index, weatherData) => {
// 	let output = index.replace(
// 		/{%MYCITY%}/g,
// 		document.getElementById('my-city').value
// 	);
// 	output = output.replace(
// 		/{%CURRWEATHERDESCRIPTION%}/g,
// 		weatherData.current.weather[0].description
// 	);
// 	output = output.replace(
// 		/{%CURRTEMP%}/g,
// 		Math.trunc(((weatherData.current.temp - 273.15) * 9) / 5 + 32)
// 	);
// 	output = output.replace(
// 		/{%CURRICON%}/g,
// 		`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
// 	);
// 	output = output.replace(
// 		/{%HOUR%}/g,
// 		new Date(hourTimeStamp * 1000).toLocaleString('en-US', {
// 			hour: 'numeric',
// 			hour12: true,
// 		})
// 	);
// 	output = output.replace(
// 		/{%HOURLYWEATHERDESCRIPTION%}/g,
// 		hourArray[i].weather[0].description
// 	);
// 	output = output.replace(
// 		/{%HOURLYTEMP%}/g,
// 		Math.trunc(((hourArray[i].temp - 273.15) * 9) / 5 + 32)
// 	);
// 	output = output.replace(
// 		/{%HOURLYICON%}/g,
// 		`http://openweathermap.org/img/wn/${hourArray[i].weather[0].icon}@2x.png`
// 	);
// 	output = output.replace(
// 		/{%DAYOFWEEK%}/g,
// 		new Date(dayTimeStamp * 1000).toLocaleString('en-US', {
// 			weekday: 'long',
// 		})
// 	);
// 	output = output.replace(
// 		/{%WEEKWEATHERDESCRIPTION%}/g,
// 		weekArray[i].weather[0].description
// 	);
// 	output = output.replace(
// 		/{%DAYTEMPHIGH%}/g,
// 		Math.trunc(((weekArray[i].temp.max - 273.15) * 9) / 5 + 32)
// 	);
// 	output = output.replace(
// 		/{%DAYTEMPLOW%}/g,
// 		Math.trunc(((weekArray[i].temp.min - 273.15) * 9) / 5 + 32)
// 	);
// 	output = output.replace(
// 		/{%WEEKICON%}/g,
// 		`http://openweathermap.org/img/wn/${weekArray[i].weather[0].icon}@2x.png`
// 	);

// 	return output;
// };
