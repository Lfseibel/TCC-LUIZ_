module.exports.validacao = function(application, req, res) {
	if (req.session.loggedin1) {
		const vsiape = req.session.siape;
		const connection = application.config.dbConnection();//recupera modulo que conecta com o banco
		const servidoresModel = new application.app.models.ServidoresDAO(connection);
		servidoresModel.pegarNome(vsiape, function(error, result)
		{
			var servidor = result;
			servidoresModel.requerimentosSemana(function(error, result)
			{
					res.render("validacao", {tudo: result, servidor: servidor});
			});		
		});
	} 
	else 
	{
		res.redirect('/');
	}
}

module.exports.validar = function(application, req, res){
    console.log(req);
    const requerimento = req.body.requerimento;
    const curso = req.body.curso;
    const periodo = req.body.periodo;
    const semestre = req.body.semestre;
    const turma = req.body.turma;
    const descricao = req.body.descricao;
    const usuario = req.session.ra;
    
    const connection = application.config.dbConnection();//recupera modulo que conecta com o banco
    const alunosModel = new application.app.models.AlunosDAO(connection);
    
    if(req.files)
    {
            const imagem = req.files.file.name;
            const arquivo = req.files.file;
            arquivo.mv('app/public/img/upload/'+imagem, function(err) {
                alunosModel.idAluno(usuario, function(error, result)
                {
                    const idusuario = result[0].id_usuario;
                    console.log(idusuario);
                    alunosModel.salvarRequerimento(requerimento, curso, periodo, semestre, turma, descricao, imagem, idusuario, function(error, result){														
                        res.send('oi');	
                    });	
                });		
        });
    }
    else
    {
        alunosModel.idAluno(usuario, function(error, result)
                {
                    const idusuario = result[0].id_usuario;
                    const imagem = null;
                    alunosModel.salvarRequerimento(requerimento, curso, periodo, semestre, turma, descricao, imagem, idusuario, function(error, result){														
                        res.send('oi');	
                    });	
                });	
    }
}