function AlunosDAO(connection){//classe com objetivo de acesso a dados
	this._connection = connection;
}

AlunosDAO.prototype.salvarAluno = function(aluno, callback){
		this._connection.query('insert into alunos set ? ', aluno, callback)//jason na funcao query e inseri quando acha o ?
}

module.exports = function(){
	return AlunosDAO;
}