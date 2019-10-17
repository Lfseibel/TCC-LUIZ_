function ServidoresDAO(connection){//classe com objetivo de acesso a dados data acess object
	this._connection = connection;
}

ServidoresDAO.prototype.salvarServidor = function(nome, siape, hash, callback){
	this._connection.query('insert into servidor set nome_servidor = ?,siape_servidor = ?,senha_servidor = ?', [nome, siape, hash], callback);//jason na funcao query e inseri quando acha o ?
}

ServidoresDAO.prototype.loginServidor = function(siape, callback){
	this._connection.query('select senha_servidor from servidor where siape_servidor = ?', siape, callback);
}

ServidoresDAO.prototype.verificarCadastro = function(siape, callback){
	this._connection.query('select * from servidor where siape_servidor = ?', [siape], callback);
}

ServidoresDAO.prototype.dadosServidor = function(vnome, callback){
	this._connection.query('select * from usuario where ra_usuario = ? ', vnome, callback);
}

ServidoresDAO.prototype.mostrarRequerimentos = function(callback){
	this._connection.query('select * from requerimento', callback);
}

module.exports = function(){
	return ServidoresDAO;
}