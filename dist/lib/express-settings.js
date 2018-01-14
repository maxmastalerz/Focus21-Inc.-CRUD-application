'use strict';

var path = require("path");

var express = require('express'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    hogan = require('hogan-express');

module.exports = function (app) {
	app.engine('html', hogan);

	app.set('env', process.env.NODE_ENV || 'development');
	app.set('port', process.env.PORT || 8080);
	app.set('view engine', 'html');

	app.use(favicon(__dirname + '/public/favicon.ico'));
	app.use(logger('dev'));
	app.use(methodOverride());
	app.use(session({
		resave: true,
		saveUninitialized: true,
		secret: 'uwotm8'
	}));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(express.static(__dirname + '/public'));

	app.use(function (req, res, next) {
		//middle-ware to remove trailing slashes in urls
		if (req.url.substr(-1) == '/' && req.url.length > 1) {
			res.redirect(301, req.url.slice(0, -1));
		} else {
			next();
		}
	});

	app.all('*', function (req, res, next) {
		console.log('Global work for all routes');
		next();
	});

	return this;
};