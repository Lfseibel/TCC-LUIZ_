module.exports = function(application) {
	application.get('/novo', function(req, res) {
		application.app.controllers.novo.novo(application, req, res);
	})
}