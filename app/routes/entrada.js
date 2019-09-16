module.exports = function(application) {
	application.get('/entrada', function(req, res) 
	{
		application.app.controllers.entrada.entrada(application, req, res);
	});
	application.get('/sair', function(req, res) 
	{
		application.app.controllers.entrada.logout_Aluno(application, req, res);
	});
	application.post('/alunos/enviar', function(req, res) 
	{
		application.app.controllers.entrada.enviar(application, req, res);
	});
}