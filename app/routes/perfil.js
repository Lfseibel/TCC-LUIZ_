module.exports = function(application) {
	application.get('/perfil', function(req, res) {
		application.app.controllers.perfil.perfil(application, req, res);
	})
}