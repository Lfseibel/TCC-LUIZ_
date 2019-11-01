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

if(screen.width < 1024){ 
  $(document).ready(function() {
    $('.menu-mobile').slideAndSwipe();
  });
}
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
        'Técnico em Informática para Internet': 'Técnico em Informática Para Internet',
        'Jogos Digitais': 'Jogos Digitais',
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
        'Matutino': 'Matutino',
        'Vespertino': 'Vespertino',
        'Noturno': 'Noturno',
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
        '1° Semestre': '1° Semestre',
        '2° Semestre': '2° Semestre',
        '3° Semestre': '3° Semestre',
        '4° Semestre': '4° Semestre',
        '5° Semestre': '5° Semestre',
        '6° Semestre': '6° Semestre',
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
        'Turma A': 'Turma A',
        'Turma B': 'Turma B',
        'Turma C': 'Turma C',
        'Turma D': 'Turma D',
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
        
        var requerimento = new Requerimento(result, id);
        
        $.ajax({
          type: 'POST',
          url: "/alunos/enviar",
          // Form data
          data: requerimento.toFormData(),
          headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
          // Tell jQuery not to process data or worry about content-type
          // You *must* include these options!
          cache: false,
          contentType: false,
          processData: false,
        }).done(function(res) {
          Swal.fire(
            'Sucesso!',
            'Seu requerimento foi enviado com sucesso!',
            'success',
          ).then(function(){
            location.reload();
          })
        })
        
          
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

class Requerimento {
  constructor(result, id) {
    this.requerimento = id;
    this.curso = result.value[0];
    this.turno = result.value[1];
    this.periodo = result.value[2];
    this.turma = result.value[3];
    this.descricao = result.value[4];
    this.file = result.value[5];
  }

  toFormData() {
    var f = new FormData();
    var self = this;
    Object.keys(this).forEach(function(key){
      f.append(key, self[key]);
    });

    return f;
  }
}