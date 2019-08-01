module.exports.home = function(application, req, res) {	
	res.render("index", {validacao: {}, login: {}});
}

module.exports.login_Aluno = function(application, req, res){
	const login = req.body;
	console.log(login);
	req.assert('ra_usuario','RA inválido').len(6);
	req.assert('senha_login','Senha é obrigatoria').notEmpty();
	const erros = req.validationErrors();
	if (erros) {
		res.render("index", {validacao : erros, login : login});
		return;
	}
	const connection = application.config.dbConnection();//recupera modulo que conecta com o banco
	const alunosModel = new application.app.models.AlunosDAO(connection);
	
	alunosModel.loginAluno(login, function(error, result){
		res.redirect('/entrada');
	});
}