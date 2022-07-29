const mySQL = require('mysql');

const db = mySQL.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

db.connect(function (err) {
	if (err) {
		console.error('MySQL is not connected');
		return;
	} else {
		console.log('MySQL is connected');
	}
});

module.exports = db;
