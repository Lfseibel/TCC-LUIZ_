module.exports.home = function(application, req, res) {	
	res.render("index", {validacao: {}});
}

module.exports.login_Aluno = function(application, req, res){
	const login = req.body;
	req.assert('ra_usuario','RA deve conter 6 números').len(6);
	req.assert('senha_login','Senha é obrigatoria').notEmpty();
	const erros = req.validationErrors();
	if (erros) {
		res.render("tcadastro", {validacao : erros, usuario : usuario});
		return;
	}
	const connection = application.config.dbConnection();//recupera modulo que conecta com o banco
	const alunosModel = new application.app.models.AlunosDAO(connection);
	
	alunosModel.salvarAluno(usuario, function(error, result){
		res.redirect('/entrada');
	});
}