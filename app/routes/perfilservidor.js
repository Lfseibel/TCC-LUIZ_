module.exports = function(application) {
	application.get('/perfilservidor', function(req, res) {
		application.app.controllers.perfil.perfilservidor(application, req, res);
	})
}