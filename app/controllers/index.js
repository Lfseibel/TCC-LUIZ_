module.exports.home = function(application, req, res) {	
	if (!req.session.loggedin) 
	{
		if (!req.session.loggedin1) 
		{
			res.render("index", {validacao: {}, ra: {}, senha: {}});
		} 
		else 
		{
			res.redirect('/servidor');
		}
	} 
	else 
	{
		res.redirect('/entrada');
	}
}

module.exports.login_Aluno = function(application, req, res){
	const ra = req.body.ra_usuario;
	const senha = req.body.senha_usuario;
	const bcrypt = require('bcrypt');
	const connection = application.config.dbConnection();//recupera modulo que conecta com o banco
	const alunosModel = new application.app.models.AlunosDAO(connection);

	req.assert('ra_usuario','RA deve conter 6 números').notEmpty();
	req.assert('senha_usuario','CPF deve conter 11 digitos').notEmpty();
	const erros = req.validationErrors();
	if (erros) {
		res.send('preencher');
		return;
	}

	alunosModel.verificarCadastroLogin(ra, function (error, result) {
		if (result.length > 0) {
			alunosModel.loginAluno(ra, function(error, result){
				const hash = result[0].senha_usuario.toString();
				bcrypt.compare(senha, hash, function(error, response){
					if (response == true) {
						req.session.loggedin = true;
						req.session.ra = ra;
						res.send('entrada');
					} else {
						res.send('erro');
					}					
				});				
			});
				} else {
					res.send('cadastro');
		}		
	});

		
}

module.exports.login_Servidor = function(application, req, res){
	console.log(req.body)
	const siape = req.body.siape_servidor;
	const senha = req.body.senha_servidor;
	const bcrypt = require('bcrypt');
	const connection = application.config.dbConnection();//recupera modulo que conecta com o banco
	const servidoresModel = new application.app.models.ServidoresDAO(connection);
	
	req.assert('siape_servidor').notEmpty();
	req.assert('senha_servidor').notEmpty();
	const erros = req.validationErrors();
	if (erros) {
		res.send('preencher');
		return;
	}

	servidoresModel.verificarCadastro(siape, function (error, result) {
		if (result.length > 0) {
			servidoresModel.loginServidor(siape, function(error, result){
				const hash = result[0].senha_servidor.toString();
				bcrypt.compare(senha, hash, function(error, response){
					if (response == true) {
						req.session.loggedin1 = true;
						req.session.siape = siape;
						res.send('servidor');
					} else {
						res.send('erro');
					}					
				});				
			});
				} else {
					res.send('cadastro');
		}		
	});
}

	