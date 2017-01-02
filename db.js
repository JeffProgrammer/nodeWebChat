//-----------------------------------------------------------------------------
// The MIT License (MIT)
// 
// Copyright (c) 2017 Jeff Hutchinson
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//-----------------------------------------------------------------------------

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