// const weatherData = require('./apiHandler');

console.log('hello from insertWeather!');

exports.insertWeather = async function (weatherData) {
	console.log('function insertWeather called...');

	// inserts for CURRENT weather
	const currWeatherDescription = weatherData.current.weather[0].description,
		currTemp = Math.trunc(
			((weatherData.current.temp - 273.15) * 9) / 5 + 32
		),
		currIcon = `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`;

	// console.log(currWeatherDescription); // <-- works just fine

	// for some reason the hourly data comes to us in reverse order, so I just unreverse it:
	const hourArray = weatherData.hourly.slice(0, 12);
	// console.log(hourArray);
	let hourTimeStamp = [];
	let hour = [];
	let hourlyWeatherDescription = [];
	let hourlyTemp = [];
	let hourlyIcon = [];
	let hourlyHtml = [];

	// await hourArray.forEach((data) => {
	// 	hourTimeStamp.push(data.dt);
	// 	hour.push(
	// 		new Date(hourTimeStamp * 1000).toLocaleString('en-US', {
	// 			hour: 'numeric',
	// 			hour12: true,
	// 		})
	// 	);
	// });
	// console.log(hourTimeStamp);
	// console.log(hour);
	// inserts for HOURLY weather
	// let hourData = {};
	await hourArray.forEach((data) => {
		// console.log(data);
		hourTimeStamp.push(data.dt);
		hour.push(
			new Date(hourTimeStamp * 1000).toLocaleString('en-US', {
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
				${hour} ${hourlyWeatherDescription}<br> at ${hourlyTemp} &deg;F
				</p>
				<img class="hourly-img" src="${hourlyIcon}" />
			</div>
		`);

		// return (hourData = {
		// 	hour,
		// 	hourlyWeatherDescription,
		// 	hourlyTemp,
		// 	hourlyIcon,
		// 	hourlyHtml,
		// });
	});
	// .then(console.log(hourData.hourTimeStamp));

	// for some reason the weeks data comes to us in reverse order, so I just unreverse it:
	const weekArray = weatherData.daily;
	let dayTimeStamp = [];
	let dayOfWeek = [];
	let weekWeatherDescription = [];
	let dayTempHigh = [];
	let dayTempLow = [];
	let weekIcon = [];
	let weekHtml = [];

	// inserts for ONE WEEK weather
	// let weekData = {};
	await weekArray.forEach((data, i) => {
		dayTimeStamp.push(data.dt);
		dayOfWeek.push(
			new Date(dayTimeStamp * 1000).toLocaleString('en-US', {
				weekday: 'long',
			})
		);
		weekWeatherDescription.push(data.weather[0].description);
		dayTempHigh.push(Math.trunc(((data.temp.max - 273.15) * 9) / 5 + 32));
		dayTempLow.push(Math.trunc(((data.temp.min - 273.15) * 9) / 5 + 32));
		weekIcon.push(
			`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
		);
		weekHtml.push(`
		<div class="forecast-boxes one-week-forecast">
			<p class="one-week-forecast-text">
			${dayOfWeek} ${weekWeatherDescription}<br> at ${dayTempHigh} / ${dayTempLow} &deg;F</p>
			<img class="one-week-img" src="${weekIcon}" />
		</div>
	`);

		// return (weekData = {
		// 	dayOfWeek,
		// 	weekWeatherDescription,
		// 	dayTempHigh,
		// 	dayTempLow,
		// 	weekIcon,
		// 	weekHtml,
		// });
	});

	// RETURN the whole thing as an object

	return {
		currWeatherDescription,
		currTemp,
		currIcon,
		hourTimeStamp,
		hour,
		dayOfWeek,
	};
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
