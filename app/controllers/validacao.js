module.exports.validacao = function(application, req, res) {
	if (req.session.loggedin1) {
        var connection = application.config.dbConnection();//recupera modulo que conecta com o banco
        var servidorModel = new application.app.models.ServidoresDAO(connection);
        
        var id_requerimento = req.query;
        
            servidorModel.getvalidar(id_requerimento, function(error, result){
                res.render("validacao", {tudo : result});
            });	   
	} 
	else 
	{
		res.redirect('/');
	}
}

module.exports.validar = function(application, req, res){
    const requerimento = req.body.detalhamento;
    
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