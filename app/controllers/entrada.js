module.exports.entrada = function(application, req, res) {
	if (req.session.loggedin) {
		const vnome = req.session.ra;
		const connection = application.config.dbConnection();//recupera modulo que conecta com o banco
		const alunosModel = new application.app.models.AlunosDAO(connection);
		alunosModel.coisasAluno(vnome, function(error, result)
		{
			res.render("entrada", {usuario: result});
		});		
	} 
	else 
	{
		res.redirect('/');
	}
}

module.exports.logout_Aluno = function(application, req, res){
	req.session.destroy(err =>{ 
		if (err) {
			return res.redirect('/entrada');
		}

		res.redirect('/');
		})
}

module.exports.enviar = function(application, req, res){
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
				const imagem = "";
				alunosModel.salvarRequerimento(requerimento, curso, periodo, semestre, turma, descricao, imagem, idusuario, function(error, result){														
					res.send('oi');	
				});	
			});	
}
		

	

	


	

	
	
}