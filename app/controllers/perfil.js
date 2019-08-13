module.exports.perfil = function(application, req, res) {	
	if (req.session.loggedin) {
		const vnome = req.session.ra;
		console.log(vnome)
		const connection = application.config.dbConnection();//recupera modulo que conecta com o banco
		const alunosModel = new application.app.models.AlunosDAO(connection);
		alunosModel.pegarNome(vnome, function(error, result)
		{
			res.render("perfil", {usuario: result});
		});		
	} else {
		res.redirect('/');
	}
	res.end();
}