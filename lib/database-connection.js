module.exports = function(mysql, dbConfig) {
	var connection = mysql.createConnection(dbConfig);
	
	connection.connect(function(err) {
		if(!err) {
			console.log("Successfully connected to database");
		} else {
			console.log("Could not connect to the database");
		}
	});

	return connection;
}