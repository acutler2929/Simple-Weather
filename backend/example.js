'use strict';

const hourTimeStamp = 1653418800,
	hour = new Date(hourTimeStamp * 1000).toLocaleString('en-US', {
		hour: 'numeric',
		hour12: true,
	});

module.exports = { hourTimeStamp, hour };
