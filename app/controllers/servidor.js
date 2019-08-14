module.exports.servidor = function(application, req, res) {
	if (req.session.loggedin1) {
		const vsiape = req.session.siape;
		res.render("servidor");
		/*const connection = application.config.dbConnection();//recupera modulo que conecta com o banco
		const alunosModel = new application.app.models.AlunosDAO(connection);
		alunosModel.pegarNome(vnome, function(error, result)
		{
			res.render("entrada", {usuario: result});
		});		*/
	} 
	else 
	{
		res.redirect('/');
	}
}

module.exports.logout_Servidor = function(application, req, res){
	req.session.destroy(err =>{ 
		if (err) {
			return res.redirect('/entrada');
		}

		res.redirect('/');
		})
}

module.exports.salvar_Servidor = function(application, req, res){
	const servidor = req.body;
	req.assert('nome_servidor','Nome do servidor é obrigatorio').notEmpty();
	req.assert('siape_servidor','SIAPE deve conter 6 números').len(6,6);
	const erros = req.validationErrors();
	if (erros) {
		res.render("servidor", {validacao : erros, servidor : servidor});
		return;
	}
	const nome = servidor.nome_servidor; 
	const siape = servidor.siape_servidor;
	const senha = servidor.senha_servidor;
	const csenha = servidor.csenha_servidor;
	if (senha==csenha) {
		const connection = application.config.dbConnection();//recupera modulo que conecta com o banco
		const servidoresModel = new application.app.models.ServidoresDAO(connection);
		servidoresModel.verificarCadastro(siape, function(error, result){
			if (result.length > 0) {
						res.send('Já existe um servidor com esta SIAPE cadastrado');
					} 
					else 
					{
						servidoresModel.salvarServidor(nome, siape, senha, function(error, result){
							res.redirect('/');
					});	
				}		
		});
	}
	else
	{
		res.send('senhas não batem')
	}
		
}