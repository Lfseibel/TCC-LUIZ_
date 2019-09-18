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
	alunosModel.loginAluno(ra, function(error, result){
		const hash = result[0].senha_usuario.toString();
		bcrypt.compare(senha, hash, function(error, response){
			if (response == true) {
				req.session.loggedin = true;
				req.session.ra = ra;
				res.redirect('/entrada');
			} else {
				res.render('index', { erro: 'Senha ou usuário incorretos'});
			}	
				
		});
				
	});
}

module.exports.login_Servidor = function(application, req, res){
	const siape = req.body.siape_servidor;
	const senha1 = req.body.senha_servidor;
	const bcrypt = require('bcrypt');
	const connection = application.config.dbConnection();//recupera modulo que conecta com o banco
	const servidoresModel = new application.app.models.ServidoresDAO(connection);
	servidoresModel.loginServidor(siape, function(error, result){
		const hash = result[0].senha_servidor.toString();
		bcrypt.compare(senha1, hash, function(error, response){
			if (response == true) {
				req.session.loggedin1 = true;
				req.session.siape = siape;
				res.redirect('/servidor');
			} else {
				res.render('index', { erro: 'Senha ou usuário incorretos'});
			}		
		});
	});
}

	