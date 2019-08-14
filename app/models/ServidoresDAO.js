function ServidoresDAO(connection){//classe com objetivo de acesso a dados data acess object
	this._connection = connection;
}

ServidoresDAO.prototype.salvarServidor = function(servidor, callback){
	this._connection.query('insert into servidor set nome_servidor = ?,siape_servidor = ?,cpf_usuario = ?,rg_usuario = ?,periodo_usuario = ?,email_usuario = ?,senha_usuario = ?', [nome, ra, cpf, rg, periodo, email, senha], callback);//jason na funcao query e inseri quando acha o ?
}

ServidoresDAO.prototype.loginServidor = function(siape, senha1, callback){
	this._connection.query('select * from servidor where siape_servidor = ? AND senha_servidor = ?', [siape,senha1], callback);
}

ServidoresDAO.prototype.pegarNome = function(vnome1, callback){
	this._connection.query('select * from servidor where siape_servidor = ? ', vnome1, callback);
}

ServidoresDAO.prototype.mostrarRequerimentos = function(callback){
	this._connection.query('select * from requerimento', callback);
}

module.exports = function(){
	return ServidoresDAO;
}