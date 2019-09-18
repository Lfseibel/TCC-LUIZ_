module.exports.tcadastroservidor = function(application, req, res) {
	if (req.session.loggedin1) {
		const vsiape = req.session.siape;
		res.render("tcadastroservidores"); 
		const connection = application.config.dbConnection();//recupera modulo que conecta com o banco
		const servidoresModel = new application.app.models.ServidoresDAO(connection);
		servidoresModel.pegarNome(vsiape, function(error, result)
		{
			res.render("entrada", {servidor: result});
		});		
	} 
	else 
	{
		res.redirect('/');
	}
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
	const bcrypt = require('bcrypt');
	const saltRounds = 10;
	if (senha==csenha) {
		const connection = application.config.dbConnection();//recupera modulo que conecta com o banco
		const servidoresModel = new application.app.models.ServidoresDAO(connection);
		servidoresModel.verificarCadastro(siape, function(error, result){
			if (result.length > 0) {
						res.send('Já existe um servidor com esta SIAPE cadastrado');
					} 
					else 
					{
						bcrypt.hash(senha, saltRounds, function(err, hash){
							servidoresModel.salvarServidor(nome, siape, hash, function(error, result){
								res.redirect('/servidor');
						});	
						});	
						
				}		
		});
	}
	else
	{
		res.send('senhas não batem')
	}
		
}