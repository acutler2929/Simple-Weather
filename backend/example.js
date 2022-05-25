'use strict';

// const days = ['sun', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat'];
// let daysInCaps = [];

// function capTheDays(data) {
// 	days.forEach((data) => {
// 		daysInCaps.push(`${data.toUpperCase()}`);
// 		return daysInCaps;
// 	});
// }

// capTheDays(days);

// console.log(daysInCaps);

const timeStamp = 1653508800;

const hour = new Date(timeStamp * 1000).toLocaleString('en-US', {
	hour: 'numeric',
	hour12: true,
});

console.log(hour);

module.exports = {};
