module.exports = function(application) {
	application.get('/tcadastroservidor', function(req, res) 
	{
		application.app.controllers.tcadastroservidor.tcadastroservidor(application, req, res);
	});

	application.post('/servidor/salvar', function(req, res) 
	{
		application.app.controllers.tcadastroservidor.salvar_Servidor(application, req, res);
	});
}