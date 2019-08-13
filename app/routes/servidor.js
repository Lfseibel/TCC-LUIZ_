module.exports = function(application) {
	application.get('/servidor', function(req, res) 
	{
		application.app.controllers.servidor.servidor(application, req, res);
	});

	application.post('/servidor/salvar', function(req, res) 
	{
		application.app.controllers.servidor.salvar_Servidor(application, req, res);
	});
}