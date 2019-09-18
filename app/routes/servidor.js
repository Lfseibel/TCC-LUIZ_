module.exports = function(application) {
	application.get('/servidor', function(req, res) 
	{
		application.app.controllers.servidor.servidor(application, req, res);
	});

	application.get('/sair', function(req, res) 
	{
		application.app.controllers.servidor.logout_Servidor(application, req, res);
	});
}