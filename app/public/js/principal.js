$(document).on('click', '.icone', function () {
  $(this).addClass('active').siblings().removeClass('active')
})

document.querySelector(".menu-button").addEventListener("click", function (event) {
  event.preventDefault();
  event.stopPropagation();
  document.querySelector('.menu-dropdown').classList.remove('hidden');
  document.querySelector('.menu-button').classList.add('text-black');
});

document.getElementsByTagName('body')[0].addEventListener('click', function (event) {
  if (!event.target.classList.contains('.menu-button')) {
    document.querySelector('.menu-dropdown').classList.add('hidden');
    document.querySelector('.menu-button').classList.remove('text-black');
  }
});

function hidden_containers() {
  document.querySelectorAll('.container').forEach(function (element) {
    element.classList.add('displayNone');
  });
}

document.querySelector('.icones').addEventListener('click', function (event) {
  if (event.target !== event.currentTarget) {
    let container_name = event.target.dataset.container;
    hidden_containers();
    document.querySelector(`.${container_name}`).classList.remove('displayNone');
  }
});
// modal que receberá as informações do usuário
$('.lista li').click(function () {
  var id = $(this).attr('id');
  Swal.mixin({
    inputPlaceholder: 'Escolha a opção',
    confirmButtonText: 'Próximo',
    confirmButtonColor: '#159952',
    allowOutsideClick: false,
    showCloseButton: true,
  }).queue([
    {
      title: 'Informe o seu curso',
      input: 'select',
      inputOptions: {
        'técnico em informática para internet': 'Técnico em Informática Para Internet',
        'jogos digitais': 'Jogos Digitais',
      },
      inputValidator: (value) => {
        if (!value) {
          return 'Informe seu curso para continuar!'
        }
      },
    },
    {
      title: 'Informe seu turno',
      input: 'select',
      inputOptions: {
        'matutino': 'Matutino',
        'vespertino': 'Vespertino',
        'noturno': 'Noturno',
      },
      inputValidator: (value) => {
        if (!value) {
          return 'Informe seu turno para continuar!'
        }
      },
    },
    {
      title: 'Informe seu período',
      input: 'select',
      inputOptions: {
        '1° semestre': '1° Semestre',
        '2° semestre': '2° Semestre',
        '3° semestre': '3° Semestre',
        '4° semestre': '4° Semestre',
        '5° semestre': '5° Semestre',
        '6° semestre': '6° Semestre',
      },
      inputValidator: (value) => {
        if (!value) {
          return 'Informe seu período para continuar!'
        }
      },
    },
    {
      title: 'Informe sua turma',
      input: 'select',
      inputOptions: {
        'turma a': 'Turma A',
        'turma b': 'Turma B',
        'turma c': 'Turma C',
        'turma d': 'Turma D',
      },
      inputValidator: (value) => {
        if (!value) {
          return 'Informe sua turma para continuar!'
        }
      },
    },
    {
      title: 'Detalhe seu pedido',
      input: 'textarea',
      inputPlaceholder: 'Digite aqui',
      inputValidator: (value) => {
        if (!value) {
          return 'Por favor descreva seu pedido para continuar'
        }
      },
    },
    {
      title: 'Escolha seu arquivo',
      input: 'file',
      inputAttributes: {
        accept: '/*',
      'aria-label': 'Upload your profile picture',
        
      }
    },
    {
      title: 'Deseja enviar o requerimento?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#159952',
      cancelButtonColor: '#37393B',
      confirmButtonText: 'Sim',
      showLoaderOnConfirm: true,
      cancelButtonText: 'Não'
    }
  ])
    .then((result) => {
      if (result.value) {
        alert(result.value);
        const requerimento = id;
        const curso = result.value[0];
        const periodo = result.value[1];
        const semestre = result.value[2];
        const turma = result.value[3];
        const descricao = result.value[4];
        if(result.value[5]==null)
        { 
          const imagem = result.value[5];
          $.post("/alunos/enviar", {requerimento : requerimento, curso : curso, periodo : periodo, semestre : semestre, turma : turma, descricao : descricao, imagem : imagem}, function (res) {
            Swal.fire(
              'Sucesso!',
              'Seu requerimento foi enviado com sucesso!',
              'success',
            )
          })
        } 
        else
        {
          //const imagem = JSON.stringify(result.value[5].name);
          const imagem = result.value[5].name;
          alert(result.value[5].lastModifiedDate);
          alert(result.value[5].size);
          alert(result.value[5].type);
          alert(result.value[5].webkitRelativePath);
          //https://developer.mozilla.org/en-US/docs/Web/API/File   ver com o devigo formidable e express-fileupload no npm
          $.post("/alunos/enviar", {requerimento : requerimento, curso : curso, periodo : periodo, semestre : semestre, turma : turma, descricao : descricao, imagem : imagem}, function (res) {
            Swal.fire(
              'Sucesso!',
              'Seu requerimento foi enviado com sucesso!',
              'success',
            )
          })
        }
          
      }
      else {
        Swal.fire(
          'Cancelado',
          'Seu requerimento foi cancelado :)',
          'error'
        )
      }
    })
});

// const readUploadedFile = (inputFile) => {
//   const reader = new FileReader();

//   return new Promise((resolve, reject) => {
//     reader.onerror = () => {
//       reader.abort();
//       reject(new DOMException("Problem parsing input file."));
//     };

//     reader.onload = (e) => {
//       resolve(e.target.result);
//     };
//     reader.readAsDataURL(inputFile);
//   });
// };

