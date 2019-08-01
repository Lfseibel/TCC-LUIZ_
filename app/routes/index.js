module.exports = function(application) {
	application.get('/', function(req, res) 
	{
		application.app.controllers.index.home(application, req, res);
	});

	application.post('/alunos/login', function(req, res) 
	{
		application.app.controllers.index.login_Aluno(application, req, res);
	});
}