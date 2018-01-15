/*
Write your own routes here.
*/

function mysql_real_escape_string(str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}

module.exports = function(app) {
	let mysql 				= require('mysql');
	let sanitizeHtml		= require('sanitize-html');
	let ops					= { allowedTags: [], allowedAttributes: [] }; // Options for sanitizeHtml
	let dbConfig 			= require('./dbConfig.js')[app.get('env')];
	let databaseConnection 	= require('./database-connection.js')(mysql, dbConfig);

	app.get('/', function(req, res) {
		res.render('index.html', {
			partials: {
				head: 'partials/head.html'
			}
		});
	});

	app.get('/note', function(req, res) {
		let start = mysql_real_escape_string(sanitizeHtml(req.query.start, ops));
		let limit = mysql_real_escape_string(sanitizeHtml(req.query.limit, ops));
		let order = mysql_real_escape_string(sanitizeHtml(req.query.order, ops));
		let dontRender = mysql_real_escape_string(sanitizeHtml(req.query.dontRender, ops));

		start = parseInt(start,10);
		if(isNaN(start) || parseInt(start, 10)<1 || start==null) {
			start = 1;
		}

		limit = parseInt(limit, 10);
		if(isNaN(limit) || limit==null) {
			limit = 999999999999;
		}

		let queryAscDesc = "DESC";
		if(order=='asc') {
			queryAscDesc = "ASC";
		}

		dontRender = parseInt(dontRender, 10);
		databaseConnection.query("SELECT * FROM notes ORDER BY creationDate "+ queryAscDesc +" LIMIT "+(start-1)+","+limit, function (error, results, fields) {

			if(error) throw error;

			if(dontRender==1) {	//extra paramter for bundle.getNotes()
				res.json(results);
			} else {
				res.render('note.html', {
					results: JSON.stringify(results),
					partials: {
						head: 'partials/head.html'
					}
				});
			}
		});
	});

	app.post('/note/add', function(req, res) {
		let noteText = mysql_real_escape_string(sanitizeHtml(req.body.noteText, ops));

		//let databaseConnection 	= require('./database-connection.js')(mysql, dbConfig);
	    databaseConnection.query("INSERT INTO notes (_id, text, creationDate) VALUES (NULL, '"+noteText+"', CURRENT_TIMESTAMP)", function (error, results, fields) {	
		//	databaseConnection.end();
			if (error) throw error;
			res.json(results);
		});
	});

	app.get('/note/:id', function(req, res) {
		let noteId = mysql_real_escape_string(sanitizeHtml(req.params.id, ops));
		
		//let databaseConnection 	= require('./database-connection.js')(mysql, dbConfig);
		databaseConnection.query("SELECT * FROM notes WHERE _id='"+noteId+"'", function (error, results, fields) {
		//	databaseConnection.end();
			if (error) throw error;

			if(results.length == 0 || results == null) {
				console.log("REDIRECTING");
				res.redirect('/note');
			}

			let noteId = results[0]._id;
			let noteText = results[0].text;
			let noteCreationDate = results[0].creationDate;

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
		let noteText = mysql_real_escape_string(sanitizeHtml(req.body.noteText, ops));
		let noteId = mysql_real_escape_string(sanitizeHtml(req.params.id, ops));

		//let databaseConnection 	= require('./database-connection.js')(mysql, dbConfig);
		databaseConnection.query("UPDATE `notes` SET `text` = '"+noteText+"' WHERE `notes`.`_id` = "+noteId+";", function (error, results, fields) {
		//	databaseConnection.end();
			if(error) throw error;
			res.json(results);
		});
	});

	app.delete('/note/:id', function(req, res) {
		let noteId = mysql_real_escape_string(sanitizeHtml(req.params.id, ops));

		//let databaseConnection 	= require('./database-connection.js')(mysql, dbConfig);
		databaseConnection.query("DELETE FROM notes WHERE _id='"+noteId+"'", function (error, results, fields) {
		//	databaseConnection.end();
			if(error) throw error;
			res.json(results);
		});
		
	});
};