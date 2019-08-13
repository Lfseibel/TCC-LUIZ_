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
	if (ra && senha) {
		const connection = application.config.dbConnection();//recupera modulo que conecta com o banco
		const alunosModel = new application.app.models.AlunosDAO(connection);
		alunosModel.loginAluno(ra, senha, function(error, result){
			if (result.length > 0) {
					req.session.loggedin = true;
					req.session.ra = ra;
					res.redirect('/entrada');
				} else {
					res.send('Incorrect Username and/or Password!');
				}			
				res.end();
			});
		}	else {
			res.send('Please enter Username and Password!');
			res.end();
	}
}

module.exports.login_Servidor = function(application, req, res){
	const siape = req.body.siape_servidor;
	const senha1 = req.body.senha_servidor;
	if (siape && senha1) {
		const connection = application.config.dbConnection();//recupera modulo que conecta com o banco
		const servidoresModel = new application.app.models.ServidoresDAO(connection);
		servidoresModel.loginServidor(siape, senha1, function(error, result){
			if (result.length > 0) {
					req.session.loggedin1 = true;
					req.session.siape = siape;
					res.redirect('/servidor');
				} else {
					res.send('Incorrect Username and/or Password!');
				}			
				res.end();
			});
		}	else {
			res.send('Please enter Username and Password!');
			res.end();
	}
}
	