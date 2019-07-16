module.exports.tcadastro = function(application, req, res) {
	res.render("tcadastro",{validacao: {}, usuario : {}});
}

module.exports.salvar_Aluno = function(application, req, res){
	const usuario = req.body;

	req.assert('nome_usuario','Nome do estudante é obrigatorio').notEmpty();
	req.assert('ra_usuario','RA deve conter 6 números').len(6);
	req.assert('cpf_usuario','CPF deve conter 11 digitos').len(11);
	req.assert('rg_usuario','RG deve conter entre 4 á 12 digitos').len(4,12);
	req.assert('periodo_usuario','Período é obrigatorio').notEmpty();
	req.assert('email_usuario','Email é obrigatorio').notEmpty();
	req.assert('senha_usuario','Senha é obrigatoria').notEmpty();
	const erros = req.validationErrors();
	if (erros) {
		res.render("tcadastro", {validacao : erros, usuario : usuario});
		return;
	}
	const connection = application.config.dbConnection();//recupera modulo que conecta com o banco
	const alunosModel = new application.app.models.AlunosDAO(connection);
	
	alunosModel.salvarAluno(usuario, function(error, result){
		res.redirect('/');
	});
}