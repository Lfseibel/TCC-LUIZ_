module.exports = function(application) {
	application.get('/validacao', function(req, res) 
	{
		application.app.controllers.validacao.validacao(application, req, res);
	});

	application.post('/servidor/validar', function(req, res) 
	{
		application.app.controllers.validacao.validar(application, req, res);
	});
}