let templates = {
	currentWeather: `
		<div id="current-weather" class="forecast-boxes">
			<p id="current-weather-text">The weather in ${myCity} is currently ${currWeatherDescription} at ${currTemp} &deg;F.</p>
			<img id="current-weather-img" src="${currIcon}" />
		</div>
	`,

	hourlyWeather: `
       <div class="forecast-boxes hourly-forecast">
            <p class="hourly-forecast-text">
            ${hour} ${hourlyWeatherDescription}<br> at ${hourlyTemp} &deg;F
            </p>
            <img class="hourly-img" src="${hourlyIcon}" />
        </div>
    `,

	weekWeather: `
        <div class="forecast-boxes one-week-forecast">
            <p class="one-week-forecast-text">
            ${dayOfWeek} ${weekWeatherDescription}<br> at ${dayTempHigh} / ${dayTempLow} &deg;F</p>
            <img class="one-week-img" src="${weekIcon}" />
        </div>
    `,
};

(module.exports = templates.currentWeather),
	templates.hourlyWeather,
	templates.weekWeather;
