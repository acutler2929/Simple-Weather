'use strict';

const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());

const apiKey = require('./config.js');
console.log(apiKey);

app.listen('8888', function () {
	console.log('Listening on 8888...');
});
