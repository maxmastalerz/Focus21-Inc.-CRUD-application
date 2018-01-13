var express 	= require('express'),
	http 		= require('http'),
	env 		= process.env.NODE_ENV || 'development',
	dbConfig 	= require('./dbConfig.js')[env],
	mysql 		= require('mysql');

var app = module.exports = express();

require('./express-settings.js')(app);
require('./express-routes.js')(app);
require('./database-connection.js')(mysql, dbConfig);

if(app.get('env')==='development') {
	app.use(require('errorhandler')());
	app.locals.pretty = true;
}

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port '+app.get('port')+' in a '+env+' environment.');
});