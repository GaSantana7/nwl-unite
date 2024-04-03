let participantes = [
  {
    nome: "Gabriel Santana",
    email: "gabriel@gmail.com",
    dataInscricao: new Date(2024, 3, 1, 19, 23),
    dataCheckIn: new Date(2024, 3, 1, 20, 0) 
  },
  {
    nome: "Breno Faustino",
    email: "breno@gmail.com",
    dataInscricao: new Date(2024, 2, 2, 19, 23),
    dataCheckIn: new Date(2024, 2, 5, 20, 20) 
  },
  {
    nome: "Alice Silva",
    email: "alice@gmail.com",
    dataInscricao: new Date(2024, 1, 15, 10, 45),
    dataCheckIn: new Date(2024, 1, 15, 11, 30) 
  },
  {
    nome: "Pedro Almeida",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 0, 10, 14, 0),
    dataCheckIn: new Date(2024, 0, 10, 15, 15) 
  },
  {
    nome: "Mariana Oliveira",
    email: "mariana@gmail.com",
    dataInscricao: new Date(2023, 11, 5, 8, 30),
    dataCheckIn: new Date(2023, 11, 5, 9, 0) 
  },
  {
    nome: "Carlos Rodrigues",
    email: "carlos@gmail.com",
    dataInscricao: new Date(2023, 10, 20, 18, 0),
    dataCheckIn: new Date(2023, 10, 20, 18, 30) 
  },
  {
    nome: "Luana Pereira",
    email: "luana@gmail.com",
    dataInscricao: new Date(2023, 9, 12, 12, 0),
    dataCheckIn: new Date(2023, 9, 12, 12, 45) 
  },
  {
    nome: "Fernando Costa",
    email: "fernando@gmail.com",
    dataInscricao: new Date(2023, 8, 25, 16, 30),
    dataCheckIn: new Date(2023, 8, 25, 17, 10) 
  },
  {
    nome: "Camila Santos",
    email: "camila@gmail.com",
    dataInscricao: new Date(2023, 7, 8, 9, 15),
    dataCheckIn: new Date(2023, 7, 8, 10, 0) 
  },
  {
    nome: "Rafael Lima",
    email: "rafael@gmail.com",
    dataInscricao: new Date(2023, 6, 18, 14, 50),
    dataCheckIn: new Date(2023, 6, 18, 15, 30) 
  }
];


const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).
  to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).
  to(participante.dataCheckIn)
  
  //condicional
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
    <button
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)"
    >
      Confirmar check-in
    </button>
    `
  }
  
  return `
  <tr>
      <td>
        <strong>
        ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
    `
}

const atualizarLista = (participantes) => {
let output = ""
for(let participante of participantes){
  output = output + criarNovoParticipante(participante)
}


// substituir informação do HTML
document
.querySelector('tbody')
.innerHTML = output
}
atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

//verificar se o participante ja existe
const participanteExiste = participantes.find(
  (p) => {
    return p.email == participante.email
  }
)

if(participanteExiste) {
  alert('Email já cadastrado!')
  return
}

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  //limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {

  //confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(mensagemConfirmacao) == false) {
    return
  } 

  //encontrar o participante dentro da lista
  const participante = participantes.find((p)=> {
    return p.email == event.target.dataset.email
  })
  //atualizar o check in do participante
  participante.dataCheckIn = new Date()
  //atualizar a lista de participantes
  atualizarLista(participantes)
}