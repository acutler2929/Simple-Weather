// const weatherData = require('./apiHandler');

console.log('hello from insertWeather!');

function insertWeather() {
	console.log(weatherData);

	// for some reason the hourly data comes to us in reverse order, so I just unreverse it:
	const hourArray = weatherData.hourly.slice(0, 12).reverse();

	// for some reason the weeks data comes to us in reverse order, so I just unreverse it:
	const weekArray = weatherData.daily.reverse();

	module.exports = (index, weatherData) => {
		let output = index.replace(
			/{%MYCITY%}/g,
			document.getElementById('my-city').value
		);
		output = output.replace(
			/{%CURRWEATHERDESCRIPTION%}/g,
			weatherData.current.weather[0].description
		);
		output = output.replace(
			/{%CURRTEMP%}/g,
			Math.trunc(((weatherData.current.temp - 273.15) * 9) / 5 + 32)
		);
		output = output.replace(
			/{%CURRICON%}/g,
			`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
		);
		output = output.replace(
			/{%HOUR%}/g,
			new Date(hourTimeStamp * 1000).toLocaleString('en-US', {
				hour: 'numeric',
				hour12: true,
			})
		);
		output = output.replace(
			/{%HOURLYWEATHERDESCRIPTION%}/g,
			hourArray[i].weather[0].description
		);
		output = output.replace(
			/{%HOURLYTEMP%}/g,
			Math.trunc(((hourArray[i].temp - 273.15) * 9) / 5 + 32)
		);
		output = output.replace(
			/{%HOURLYICON%}/g,
			`http://openweathermap.org/img/wn/${hourArray[i].weather[0].icon}@2x.png`
		);
		output = output.replace(
			/{%DAYOFWEEK%}/g,
			new Date(dayTimeStamp * 1000).toLocaleString('en-US', {
				weekday: 'long',
			})
		);
		output = output.replace(
			/{%WEEKWEATHERDESCRIPTION%}/g,
			weekArray[i].weather[0].description
		);
		output = output.replace(
			/{%DAYTEMPHIGH%}/g,
			Math.trunc(((weekArray[i].temp.max - 273.15) * 9) / 5 + 32)
		);
		output = output.replace(
			/{%DAYTEMPLOW%}/g,
			Math.trunc(((weekArray[i].temp.min - 273.15) * 9) / 5 + 32)
		);
		output = output.replace(
			/{%WEEKICON%}/g,
			`http://openweathermap.org/img/wn/${weekArray[i].weather[0].icon}@2x.png`
		);

		return output;
	};
}

module.exports = insertWeather;
