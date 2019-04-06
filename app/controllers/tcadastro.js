module.exports.tcadastro = function(application, req, res) {
	res.render("tcadastro",{validacao: {}});
}

module.exports.salvar_aluno = function(application, req, res){
	var aluno = req.body;

	/*req.assert('nome','Nome é obrigatorio').notEmpty();
	req.assert('ra','RA do aluno é obrigatorio').notEmpty();
	req.assert('email','Email invalido').notEmpty();// existe um assert que verifica email
	req.assert('senha','Senha é obrigatoria').notEmpty();
	function isValidPassword(value) {
	var senha = document.getElementsById('senha');
	var c_senha = document.getElementsById('c_senha');
	if (senha!=c_senha) return false 
	}
	req.assert('c_senha').custom(isValidPassword).withMessage('As senhas não são iguais');
	var erros = req.validationErrors();
	if (erros) {
		res.render("tcadastro", {validacao : erros, aluno : aluno});
		return;
	}*/
	var connection = application.config.dbConnection();//recupera modulo que conecta com o banco
	var alunosModel = new application.app.models.AlunosDAO(connection);
	
	alunosModel.salvarAluno(aluno, function(error, result){
		res.redirect('/');
	});

}