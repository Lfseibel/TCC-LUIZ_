function cadastro() {
    const nome = document.getElementById('nome').value;
    const ra = document.getElementById('ra').value;
    const cpf = document.getElementById('cpf').value;
    const rg = document.getElementById('rg').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const csenha = document.getElementById('c_senha').value;
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000
    })
    $.post('/alunos/salvar', { nome_usuario: nome, ra_usuario: ra, cpf_usuario: cpf, rg_usuario: rg, email_usuario: email, senha_usuario: senha, csenha_usuario: csenha }, function (res) {
            if (res == 'cadastrado') {
                Toast.fire({
                    type: 'error',
                    title: 'Usuário já cadastrado no sistema'
                })
            } else if (res == 'sucesso') {
                Toast.fire({
                    type: 'success',
                    title: 'Seu cadastro foi realizado com sucesso!'
                }).then(function(){
                    location.href="/", 4100
                  })
            } else if (res == 'errodasenha') {
                Toast.fire({
                    type: 'warning',
                    title: 'Aluno verifique suas senhas, elas não estão correspondendo!'
                })
            } else if (res == 'preencher') {
                Toast.fire({
                    type: 'warning',
                    title: 'Preencha o formulário corretamente!'
                })
            }
        });
}
