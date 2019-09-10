module.exports.entrada = function(application, req, res) {
	if (req.session.loggedin) {
		const vnome = req.session.ra;
		const connection = application.config.dbConnection();//recupera modulo que conecta com o banco
		const alunosModel = new application.app.models.AlunosDAO(connection);
		alunosModel.coisasAluno(vnome, function(error, result)
		{
			res.render("entrada", {usuario: result});
		});		
	} 
	else 
	{
		res.redirect('/');
	}
}

module.exports.logout_Aluno = function(application, req, res){
	req.session.destroy(err =>{ 
		if (err) {
			return res.redirect('/entrada');
		}

		res.redirect('/');
		})
}

module.exports.enviar = function(application, req, res){
	console.log(requerimento);
}