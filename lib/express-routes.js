/*
Write your own routes here.
*/

module.exports = function(app) {
	var mysql 				= require('mysql');
	var sanitizeHtml		= require('sanitize-html');
	var dbConfig 			= require('./dbConfig.js')[app.get('env')];
	var databaseConnection 	= require('./database-connection.js')(mysql, dbConfig);

	app.get('/', function(req, res) {
		res.render('index.html', {
			partials: {
				head: 'partials/head.html'
			}
		});
	});

	app.get('/note', function(req, res) {
		var start = sanitizeHtml(req.query.start);
		var limit = sanitizeHtml(req.query.limit);
		var order = sanitizeHtml(req.query.order);

		start = parseInt(start,10);
		if(isNaN(start) || parseInt(start, 10)<1 || start==null) {
			start = 1;
		}

		limit = parseInt(limit, 10);
		if(isNaN(limit) || limit==null) {
			limit = 999999999999;
		}

		var queryAscDesc = "DESC";
		if(order=='asc') {
			queryAscDesc = "ASC";
		}

		databaseConnection.query("SELECT * FROM notes ORDER BY creationDate "+ queryAscDesc +" LIMIT "+(start-1)+","+limit, function (error, results, fields) {
			if(error) throw error;

			res.render('note.html', {
				results: results,
				partials: {
					head: 'partials/head.html'
				}
			});
		});

	});

	app.post('/note/add', function(req, res) {
		var _id = req.body.noteId;
	    var noteText = sanitizeHtml(req.body.noteText);

	    databaseConnection.query("INSERT INTO notes (_id, text, creationDate) VALUES (NULL, '"+noteText+"', CURRENT_TIMESTAMP)", function (error, results, fields) {
			if (error) throw error;
			

		});

	    console.log(_id + ' and ' + noteText);
	    res.redirect('/note');
	});

	app.get('/note/:id', function(req, res) {
		var noteId = "";
		var noteText = "";
		var noteCreationDate = "";

		databaseConnection.query("SELECT * FROM notes WHERE _id='"+req.params.id+"'", function (error, results, fields) {
			if (error) throw error;

			noteId = results[0]._id;
			noteText = results[0].text;
			noteCreationDate = results[0].creationDate;

			res.render('viewNote.html', {
				noteIdVal: noteId,
				noteTextVal: noteText,
				noteCreationDateVal: noteCreationDate,
				partials: {
					head: 'partials/head.html'
				}
			});
		});

	});

	app.put('/note/:id', function(req, res) {
		articleProvider.findById(req.params.id, function(error, article) {
			res.render('blogedit.html', {
				partials: {
					head: 'partials/head.html'
				}
			});
		});
	});

	app.delete('/note/:id', function(req, res) {
		articleProvider.findById(req.params.id, function(error, article) {
			res.render('blogedit.html', {
				partials: {
					head: 'partials/head.html'
				}
			});
		});
	});
};