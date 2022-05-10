const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const request = require('request');

const apiKey = process.env.API_KEY,
	myCity = 'kalamazoo',
	stateCode = 'mi',
	countryCode = 'usa',
	resultLimit = 1;

request(
	`http://api.openweathermap.org/geo/1.0/direct?q=${myCity},${stateCode},${countryCode}&limit=${resultLimit}&appid=${apiKey}`,
	{ json: true },
	(err, res, body) => {
		if (err) {
			return console.log(err);
		}
		// console.log(res);
		return res;
	}
);

console.log(res);
