var fs = require('fs');
var mysql = require('mysql');

// Get database information from a separate file.
// Check if file exists
// http://stackoverflow.com/a/14392235
var fileContents = "";
try {
	fileContents = fs.readFileSync(__dirname + '/dbConnection.json');
} catch (err) {
	if (err.code === 'ENOENT') {
		console.log("Missing file dbConnection.json");
	} else {
		console.log("Unknown exception e");
		console.log(e);
	}
	return;
}

// Now we parse the contents of the file.
try {
	// Here is the structure of the JSON object from the file:
	// {
	//    "host": HOST_NAME,
	//    "user": USERNAME_HERE,
	//    "password": PASSWORD,
	//    "database": DATABASE_NAME
	// }	
	var dbConnObj = JSON.parse(fileContents);
} catch (exception) {
	if (exception instanceof SyntaxError) {
		console.log("Syntax Error in loading the databases connection object. Please fix this error.");
		console.log("Line Number: " + exception.lineNumber + " Message: " + exception.message);
	} else {
		console.log("Unkown exception e");
		console.log(e);
	}
	return;
}

// create a connection to the mysql database and connect to it.
var connection = mysql.createConnection({
	host: dbConnObj.host,
	user: dbConnObj.user,
	password: dbConnObj.password,
	database: dbConnObj.database
});
connection.connect();

// Finally, export the SQL connection that we will be using.
module.exports.connection = connection;