module.exports = function(application) {
	application.get('/tcadastro', function(req, res) {
		application.app.controllers.tcadastro.tcadastro(application, req, res);
	})

	application.post('/alunos/salvar', function(req, res) {
		var aluno = req.body;
		res.send(aluno);
	});

}