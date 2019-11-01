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

ServidoresDAO.prototype.pegarNome = function(vsiape, callback){
	this._connection.query('select * from servidor where siape_servidor = ? ', vsiape, callback);
}

ServidoresDAO.prototype.requerimentosSemana = function(callback){
	this._connection.query('select * from requerimento inner join usuario on id_usuario=usuario_requerimento', callback);
}

ServidoresDAO.prototype.getvalidar = function(id_requerimento, callback){
	this._connection.query('select * from requerimento inner join usuario on id_usuario=usuario_requerimento where id_requerimento = ' + id_requerimento.id_requerimento, callback);
}

module.exports = function(){
	return ServidoresDAO;
}