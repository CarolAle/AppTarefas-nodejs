var bodyParser = require('body-parser');
var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var helmet = require('helmet');
var logger = require('./logger.js');

module.exports = app => {
	app.set("port", 3000);
	app.set("json spaces", 4);
	app.use(morgan("common", {
		stream: {
			write: (message) => {
				logger.info(message);
			}
		}
	}));
	app.use(helmet());
	app.use(cors({
		origin: ["http://localhost:3001"],
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Autorization"]
	}));
	app.use(bodyParser.json());
	app.use(app.auth.initialize());
	app.use((req, res, next) => {
		delete req.body.id;
		next();
	});
	app.use(express.static("public"));
};