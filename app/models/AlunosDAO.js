function AlunosDAO(connection){//classe com objetivo de acesso a dados data acess object
	this._connection = connection;
}

AlunosDAO.prototype.salvarAluno = function(nome, ra, cpf, rg, periodo, email, senha, callback){
	this._connection.query('insert into usuario values ', [nome,ra,cpf,rg,periodo,email,senha], callback);//jason na funcao query e inseri quando acha o ?
}

AlunosDAO.prototype.loginAluno = function(ra, senha, callback){
	this._connection.query('select * from usuario where ra_usuario = ? AND senha_usuario = ?', [ra,senha], callback);
}

AlunosDAO.prototype.verificarCadastro = function(ra, cpf, rg, email, callback){
	this._connection.query('select * from usuario where ra_usuario = ? AND cpf_usuario = ? AND rg_usuario = ? AND email_usuario = ?', [ra,cpf,rg,email], callback);
}

AlunosDAO.prototype.pegarNome = function(vnome, callback){
	this._connection.query('select * from usuario where ra_usuario = ? ', vnome, callback);
}

module.exports = function(){
	return AlunosDAO;
}