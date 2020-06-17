const myqsl = require("mysql2");
const config = require("./config.js");
 
const con = myqsl.createConnection(config.database);
con.connect(function(err) {
	if (err) throw err;
});

module.exports = con;
