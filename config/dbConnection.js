var mysql = require('mysql');

var connMySQL = function(){
	return mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : 'Luluzinha300',
			database : 'requerimento_online'
		});
}

module.exports = function () {
	return connMySQL;
}