'use strict';

/*
Write your own routes here.
*/

var indexRoutes = require('../routes/index.js'),
    helloRoutes = require('../routes/hello.js');

module.exports = function (app) {
	app.get('/', indexRoutes.index);
	app.get('/hello/dump-request-headers', helloRoutes.dumpRequest);
};