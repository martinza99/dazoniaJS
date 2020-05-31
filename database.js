const myqsl = require("mysql2");
const config = require("./config");
 
const con = myqsl.createConnection(config.database);
con.connect(function(err) {
	if (err) throw err;
});

module.exports = con;
