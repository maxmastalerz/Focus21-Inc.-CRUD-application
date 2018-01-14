'use strict';

var express = require('express'),
    http = require('http'),
    env = process.env.NODE_ENV || 'development';

var app = module.exports = express();

require('./express-settings.js')(app);
require('./express-routes.js')(app);

if (app.get('env') === 'development') {
	app.use(require('errorhandler')());
	app.locals.pretty = true;
}

var server = http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port') + ' in a ' + env + ' environment.');
});