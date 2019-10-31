function login_aluno() {
    const ra = document.getElementById('RA').value;
    const senha = document.getElementById('senha').value;
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000
    })
        $.post('/alunos/login', { ra_usuario: ra, senha_usuario: senha }, function (res) {
                if (res == 'cadastro') {
                    Toast.fire({
                        type: 'warning',
                        title: 'Usuário não cadastrado no sistema, realize o cadastro para prosseguir!'
                    })
                } else if (res == 'erro') {
                    Toast.fire({
                        type: 'error',
                        title: 'Usuário ou senha incorretos!'
                    })
                } else if (res == 'preencher') {
                    Toast.fire({
                        type: 'warning',
                        title: 'Preencha todos os campos!'
                    })
                } else if (res == 'entrada') {
                    Toast.fire({
                        type: 'success',
                        title: 'Seja bem-vindo!',
                        timer: 1000
                    }).then(function(){
                        location.href="/entrada"
                      })
                }
        });
}

function login_servidor() {
    const siape = document.getElementById('siape_servidor').value;
    const senha = document.getElementById('senha_servidor').value;
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000
    })
    $.post('/servidor/login', { siape_servidor: siape, senha_servidor: senha }, function (res) {
        if (res == 'cadastro') {
            Toast.fire({
                type: 'warning',
                title: 'Servidor não cadastrado no sistema, adquira uma chave de acesso para prosseguir!'
            })
        } else if (res == 'erro') {
            Toast.fire({
                type: 'error',
                title: 'Senha ou usuário incorretos!'
            })
        } else if (res == 'preencher') {
            Toast.fire({
                type: 'warning',
                title: 'Preencha todos os campos!'
            })
        } else if (res == 'servidor') {
            Toast.fire({
                type: 'success',
                title: 'Seja bem-vindo!',
                timer: 1000
            }).then(function(){
                location.href="/servidor"
              })
        }
        });
}
