function AlunosDAO(connection){//classe com objetivo de acesso a dados data acess object
	this._connection = connection;
}

AlunosDAO.prototype.salvarAluno = function(usuario, callback){
	this._connection.query('insert into usuario set ? ', usuario, callback);//jason na funcao query e inseri quando acha o ?
}

AlunosDAO.prototype.loginAluno = function(login, callback){
	this._connection.query('select * from usuario where ra_usuario = ?', login.ra_usuario, callback);
}

module.exports = function(){
	return AlunosDAO;
}