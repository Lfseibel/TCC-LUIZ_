function AlunosDAO(connection){//classe com objetivo de acesso a dados data acess object
	this._connection = connection;
}

AlunosDAO.prototype.salvarAluno = function(ra, cpf, rg, email, nome, hash, callback){
	this._connection.query('insert into usuario set nome_usuario = ?,ra_usuario = ?,cpf_usuario = ?,rg_usuario = ?,email_usuario = ?,senha_usuario = ?', [nome, ra, cpf, rg, email, hash], callback);//jason na funcao query e inseri quando acha o ?
}

AlunosDAO.prototype.loginAluno = function(ra, callback){
	this._connection.query('select * from usuario where ra_usuario = ? ', ra, callback);
}

AlunosDAO.prototype.verificarCadastro = function(ra, cpf, rg, email, callback){
	this._connection.query('select * from usuario where ra_usuario = ? OR cpf_usuario = ? OR rg_usuario = ? OR email_usuario = ?', [ra,cpf,rg,email], callback);
}

AlunosDAO.prototype.verificarCadastroLogin = function(ra, callback){
	this._connection.query('select * from usuario where ra_usuario = ? ', [ra], callback);
}

AlunosDAO.prototype.requerimentosAluno = function(idusuario, callback){
	this._connection.query('select * from requerimento inner join usuario on usuario_requerimento=id_usuario where id_usuario = ?', [idusuario], callback);
}

AlunosDAO.prototype.idAluno = function(usuario, callback){
	this._connection.query('select * from usuario where ra_usuario = ? ', usuario, callback);
}

AlunosDAO.prototype.dadosAluno = function(vnome, callback){
	this._connection.query('select * from usuario where ra_usuario = ? ', vnome, callback);
}

AlunosDAO.prototype.salvarRequerimento = function(requerimento, curso, periodo, turno, turma, descricao, imagem, idusuario,  callback){
	this._connection.query('insert into requerimento set tipo_requerimento = ?,curso_requerimento = ?,periodo_requerimento = ?,turno_requerimento = ?,turma_requerimento = ?,descricao_requerimento = ?,imagem_requerimento = ?,usuario_requerimento = ?', [requerimento, curso, periodo, turno, turma, descricao, imagem, idusuario], callback);//jason na funcao query e inseri quando acha o ?
}

module.exports = function(){
	return AlunosDAO;
}