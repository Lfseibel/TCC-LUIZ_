function AlunosDAO(connection){//classe com objetivo de acesso a dados data acess object
	this._connection = connection;
}

AlunosDAO.prototype.salvarAluno = function(ra, cpf, rg, email, nome, periodo, senha, callback){
	this._connection.query('insert into usuario set nome_usuario = ?,ra_usuario = ?,cpf_usuario = ?,rg_usuario = ?,periodo_usuario = ?,email_usuario = ?,senha_usuario = ?', [nome, ra, cpf, rg, periodo, email, senha], callback);//jason na funcao query e inseri quando acha o ?
}

AlunosDAO.prototype.loginAluno = function(ra, senha, callback){
	this._connection.query('select * from usuario where ra_usuario = ? AND senha_usuario = ?', [ra,senha], callback);
}

AlunosDAO.prototype.verificarCadastro = function(ra, cpf, rg, email, callback){
	this._connection.query('select * from usuario where ra_usuario = ? OR cpf_usuario = ? OR rg_usuario = ? OR email_usuario = ?', [ra,cpf,rg,email], callback);
}

AlunosDAO.prototype.coisasAluno = function(vnome, callback){
	this._connection.query('select * from usuario where ra_usuario = ? ', vnome, callback);
}

AlunosDAO.prototype.dadosAluno = function(vnome, callback){
	this._connection.query('select * from usuario where ra_usuario = ? ', vnome, callback);
}

module.exports = function(){
	return AlunosDAO;
}