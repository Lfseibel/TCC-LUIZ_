module.exports.servidor = function(application, req, res) {
	if (req.session.loggedin1) {
		const vsiape = req.session.siape;
		const connection = application.config.dbConnection();//recupera modulo que conecta com o banco
		const servidoresModel = new application.app.models.ServidoresDAO(connection);
		servidoresModel.pegarNome(vsiape, function(error, result)
		{
			var servidor = result;
			servidoresModel.requerimentosSemana(function(error, result)
			{
					res.render("servidor", {tudo: result, servidor: servidor});
			});		
		});
	} 
	else 
	{
		res.redirect('/');
	}
}

module.exports.logout_Servidor = function(application, req, res){
	req.session.destroy(err =>{ 
		if (err) {
			return res.redirect('/servidor');
		}

		res.redirect('/');
		})
}
