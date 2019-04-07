module.exports.tcadastro = function(application, req, res) {
	res.render("tcadastro",{validacao: {}, aluno : {}});
}

module.exports.salvar_Aluno = function(application, req, res){
	var aluno = req.body;
	var connection = application.config.dbConnection();//recupera modulo que conecta com o banco
	var alunosModel = new application.app.models.AlunosDAO(connection);
	
	alunosModel.salvarAluno(aluno, function(error, result){
		res.redirect('/');
	});
}