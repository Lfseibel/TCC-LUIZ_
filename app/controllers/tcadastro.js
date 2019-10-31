module.exports.tcadastro = function(application, req, res) {
	if (!req.session.loggedin) 
	{
		if (!req.session.loggedin1) 
		{
			res.render("tcadastro", {validacao: {}, ra: {}, senha: {}});
		} 
		else 
		{
			res.redirect('/servidor');
		}
	} 
	else 
	{
		res.redirect('/entrada');
	}
}

module.exports.salvar_Aluno = function(application, req, res){
	console.log(req.body);
	const ra = req.body.ra_usuario; 
	const cpf = req.body.cpf_usuario;
	const rg = req.body.rg_usuario;
	const email = req.body.email_usuario;
	const nome = req.body.nome_usuario;
	const senha = req.body.senha_usuario;
	const csenha = req.body.csenha_usuario;
	
	req.assert('nome_usuario','Nome do usuário é obrigatorio').notEmpty();
	req.assert('ra_usuario','RA deve conter 6 números').len(6,6);
	req.assert('cpf_usuario','CPF deve conter 11 digitos').len(11,11);
	req.assert('rg_usuario','RG deve conter entre 4 á 12 digitos').len(4,12);
	const erros = req.validationErrors();
	if (erros) {
		res.send('preencher');
		return;
	}
	/* importar o modulo do bcrypt*/
	const bcrypt = require('bcrypt');
	const saltRounds = 10;
	if(senha==csenha){
		const connection = application.config.dbConnection();//recupera modulo que conecta com o banco
		const alunosModel = new application.app.models.AlunosDAO(connection);
		alunosModel.verificarCadastro(ra, cpf, rg, email, function (error, result) {
			if (result.length > 0) {
					console.log('aqui2');
					res.send('cadastrado');
					} else {
						bcrypt.hash(senha, saltRounds, function(err, hash){
							alunosModel.salvarAluno(ra, cpf, rg, email, nome, hash, function(error, result){													
								res.send('sucesso');
							});	
					});		
			}		
		});
	} 
	else
	{
		console.log('aqui');
		res.send('errodasenha');
	}
		
} 

