module.exports = function(application) {
	application.post('/tcadastro', function(req, res) {
		application.app.controllers.tcadastro.tcadastro(application, req, res);
	});

	application.get('/tcadastro', function(req, res) {
		application.app.controllers.tcadastro.tcadastro(application, req, res);
	})
}