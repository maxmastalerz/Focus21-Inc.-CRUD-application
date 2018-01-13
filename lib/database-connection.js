module.exports = function(mysql, dbConfig) {
	var connection = mysql.createConnection(dbConfig);
	connection.connect(function(err) {
		if(!err) {
			console.log("Successfully connected to database");
		} else {
			console.log("Could not connect to the database");
		}

		/*connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
		  if (error) throw error;
		  console.log('The solution is: ', results[0].solution);
		});*/

		connection.end();
	});
}