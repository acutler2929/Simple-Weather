module.exports = (temp, weather) => {
	let output = temp.replace(/{%MYCITY%}/g, weather.id);
	output = output.replace(/{%CURRWEATHERDESCRIPTION%}/g, weather.productName);
	output = output.replace(/{%CURRTEMP%}/g, weather.image);
	output = output.replace(/{%CURRICON%}/g, weather.from);
	output = output.replace(/{%HOUR%}/g, weather.nutrients);
	output = output.replace(/{%HOURLYWEATHERDESCRIPTION%}/g, weather.quantity);
	output = output.replace(/{%HOURLYTEMP%}/g, weather.price);
	output = output.replace(/{%HOURLYICON%}/g, weather.description);
	output = output.replace(/{%DAYOFWEEK%}/g, weather.description);
	output = output.replace(/{%WEEKWEATHERDESCRIPTION%}/g, weather.description);
	output = output.replace(/{%DAYTEMPHIGH%}/g, weather.description);
	output = output.replace(/{%DAYTEMPLOW%}/g, weather.description);
	output = output.replace(/{%WEEKICON%}/g, weather.description);

	return output;
};
