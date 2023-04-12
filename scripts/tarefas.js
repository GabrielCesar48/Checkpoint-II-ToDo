// 01 - Selecionando elementos HTML e obtendo token de autorização

const authToken = localStorage.getItem('authToken');
const finishSessionRef = document.querySelector('#closeApp');
const userNameRef = document.querySelector('#userName');
const taskRef = document.querySelector('#novaTarefa');
const buttontaskRef = document.querySelector('#criarTarefa');
const tasksPendetesRef = document.querySelector('.tarefas-pendentes');
const tasksFinalizadasRef = document.querySelector('.tarefas-terminadas');

// Configurando os headers da requisição 
const requestHeaders = {
'Accept': 'application/json',
'Content-Type': 'application/json',
'Authorization': authToken
}

// Inicialização das variáveis 
var userTask = {
description: '',
completed: false
};
let tasksPendentes = [];
let tasksFinalizadas = [];
var checkValidation = false;

// 02 - Funções 

// Função de logout 
function logout() {
// Redireciona para a página de login e limpa o token de autorização armazenado 
window.location.href = 'https://gabrielcesar48.github.io/Checkpoint-II-ToDo/index.html';
localStorage.clear();
}

// Função que pergunta ao usuário se deseja encerrar a sessão 
function finalizaSession() {
    Swal.fire({
      title: 'Deseja mesmo sair?',
      text: 'Você será desconectado da sua conta.',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      icon: 'warning',
      iconHtml: '<i class="fas fa-exclamation-triangle fa-spin"></i>',
      iconColor: '#ff9800',
      backdrop: `linear-gradient(45deg, rgba(120, 152, 255, 0.6), rgba(142, 100, 197, 0.6))`,
      showCancelButton: true,
      confirmButtonColor: '#ff9800',
      cancelButtonColor: '#4caf50',
      confirmButtonText: 'Sim, sair agora!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  }
  
  

// Função que verifica se há um token de autorização /
function verificaToken() {
if (authToken === null) {
/ Se não houver token de autorização, mostra um aviso e redireciona para a página de login /
Swal.fire({
icon: 'error',
title: 'Epa',
text: 'Você não esta logado!'
}).then((result) => {
if (result.closed) {
logout();
} else {
logout();
}
})
} else {
// Se houver um token de autorização, carrega os dados do usuário 
getUserData();
}
}

// Função que valida se o campo de descrição da tarefa foi preenchido 
function validateInput(input) {
const inputValidacao = input.checkValidity();
if (inputValidacao) {
checkValidation = true;
} else {
checkValidation = false;
}
}

// Função que valida a descrição da tarefa
function validateDescription(task) {
userTask.description = task;
}

function getUserData() {
    // Define a configuração da solicitação à API, incluindo o método e os cabeçalhos.
    var requestConfig = {
      method: 'GET',
      headers: requestHeaders
    }
  
    // Faz uma solicitação à API para obter as informações do usuário e, em seguida, chama a função "getTasks()" se a solicitação for bem-sucedida.
    fetch('https://todo-api.ctd.academy/v1/users/getMe', requestConfig).then(
      response => {
        response.json().then(
          data => {
            var name = data.firstName + ' ' + data.lastName;
            userNameRef.innerText = name;
          }
        )
        if(response.ok) {
          getTasks();
        }  
      }
    )
  }
  
  function createTask(event) {
    // Impede o comportamento padrão do evento de enviar o formulário.
    event.preventDefault();
  
    if(checkValidation) {
      // Define a configuração da solicitação à API para criar uma nova tarefa, incluindo o método, os cabeçalhos e o corpo da solicitação.
      var requestConfig = {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(userTask)
      }
  
      // Faz uma solicitação à API para criar uma nova tarefa e, em seguida, chama a função "getTasks()" se a solicitação for bem-sucedida.
      fetch('https://todo-api.ctd.academy/v1/tasks', requestConfig).then(
        response => {
          if (response.ok){
            getTasks();
          }
        }
      )
  
      // Limpa o campo de texto da tarefa, redefine a validação e chama a função "carregamento()" para exibir uma animação de carregamento.
      taskRef.value = "";
      userTask.description = " ";
      checkValidation = false;
      carregamento();
    } else {
      // Exibe uma mensagem de erro se a validação falhar.
      Swal.fire({
        icon: 'error',
        title: 'Erro ao adicionar tarefa',
        text: 'A tarefa não tem caracteres suficientes!'
      })
    }
  }
  
  function getTasks() {
    // Define a configuração da solicitação à API para obter todas as tarefas, incluindo o método e os cabeçalhos.
    var requestConfig = {
      method: 'GET',
      headers: requestHeaders
    }
  
    // Faz uma solicitação à API para obter todas as tarefas e, em seguida, chama a função "insertTasks()" se a solicitação for bem-sucedida.
    fetch(`https://todo-api.ctd.academy/v1/tasks`, requestConfig).then(
      response => {
        if (response.ok) {
          response.json().then (
            tasks => {
              insertTasks(tasks);
            }
          )
        }
      }
    )
  }
  

// Limpa as listas de tarefas pendentes e finalizadas
function insertTasks(tasks) {
    tasksPendetesRef.innerHTML = "";
    tasksFinalizadasRef.innerHTML = "";

    // Separa as tarefas em duas listas, de acordo com a propriedade 'completed'
    tasksPendentes = tasks.filter(task => !task.completed);
    tasksFinalizadas = tasks.filter(task => task.completed);

    // Insere as tarefas pendentes na lista correspondente
    tasksPendentes.forEach(task => {
        let taskDate = new Date(task.createdAt);
        tasksPendetesRef.innerHTML += `
            <li class="tarefa">
                <div class="not-done">

                <i class="fa fa-check" id="terminar__tarefa"></i>

                </div>
                <div class="descricao">
                    <p class="nome">${task.description}</p>
                    <p class="timestamp">Criada em: ${new Intl.DateTimeFormat('pt-BR').format(taskDate)}</p>
                </div>
            </li>
        `;
    });

    // Insere as tarefas finalizadas na lista correspondente
    tasksFinalizadas.forEach(task => {
        let taskDate = new Date(task.createdAt);
        tasksFinalizadasRef.innerHTML += `
            <li class="tarefa">
                <div class="not-done">

                <i class="fa fa-ban" id="excluir__tarefa"></i>
                
                </div>
                <div class="descricao">
                    <p class="nome">${task.description}</p>
                    <p class="timestamp">Criada em: ${new Intl.DateTimeFormat('pt-BR').format(taskDate)}</p>
                </div>
            </li>
        `;
    });

    atualizar();
    deletar();
}

// Atualiza uma tarefa como concluída no servidor
function updateTask(target) {
    var userUpdate = {
        completed: true
    };
    var requestConfig = {
        method: 'PUT',
        headers: requestHeaders,
        body: JSON.stringify(userUpdate)
    };
    fetch(`https://todo-api.ctd.academy/v1/tasks/${target}`, requestConfig).then(response => {
        if (response.ok) {
            getTasks();
        }
    });
    carregamento();
}


// Essa função é chamada quando o usuário clica no botão para deletar uma tarefa.
function deleteTask(target) {
    // Configura as informações necessárias para fazer uma requisição DELETE na API.
    const requestConfig = {
      method: "DELETE",
      headers: requestHeaders,
    };
  
    // Faz a requisição DELETE para a API, passando o ID da tarefa que deve ser deletada.
    // Se a requisição for bem sucedida, chama a função getTasks para atualizar a lista de tarefas.
    fetch(`https://todo-api.ctd.academy/v1/tasks/${target}`, requestConfig).then(
      (response) => {
        if (response.ok) {
          getTasks();
        }
      }
    );
  
    // Chama a função carregamento para exibir um indicador de carregamento na tela.
    carregamento();
  }
  
  // Essa função adiciona um evento de clique em cada tarefa pendente, para permitir a sua atualização.
  function atualizar() {
    // Obtém uma referência para cada tarefa pendente.
    const completedTaskRef = Array.from(tasksPendetesRef.children);
  
    // Para cada tarefa, adiciona um evento de clique que chama a função updateTask passando o ID da tarefa como parâmetro.
    for (let i = 0; i < completedTaskRef.length; i++) {
      const clickTask = completedTaskRef[i].children[0];
  
      clickTask.addEventListener("click", () =>
        updateTask(tasksPendentes[i].id)
      );
    }
  }
  
  // Essa função adiciona um evento de clique em cada tarefa finalizada, para permitir a sua exclusão.
  function deletar() {
    // Obtém uma referência para cada tarefa finalizada.
    const deleteTaskRef = Array.from(tasksFinalizadasRef.children);
  
    // Para cada tarefa, adiciona um evento de clique que chama a função deleteTask passando o ID da tarefa como parâmetro.
    for (let i = 0; i < deleteTaskRef.length; i++) {
      const clickTask = deleteTaskRef[i].children[0];
  
      clickTask.addEventListener("click", () =>
        deleteTask(tasksFinalizadas[i].id)
      );
    }
  }
  
  // Essa função exibe um indicador de carregamento na tela.
  function carregamento() {
    // Substitui o conteúdo da lista de tarefas pendentes por um indicador de carregamento.
    tasksPendetesRef.innerHTML = `
      <div id="skeleton">
          <li class="tarefa">
              <div class="not-done"> </div>
              <div class="descricao">
              <p class="nome">Nova tarefa</p>
              <p class="timestamp">Criada em: 15/07/21</p>
          </div>
          </li>
          <li class="tarefa">
              <div class="not-done"></div>
              <div class="descricao">
              <p class="nome">Nova tarefa</p>
              <p class="timestamp">Criada em: 15/07/21</p>
          </div>
          </li>
      </div>`;
  
    // Substitui o conteúdo da lista de tarefas finalizadas por um indicador de carregamento.
    tasksFinalizadasRef.innerHTML = `
      <div id="skeleton">
          <li class="tarefa">
              <div class="not-done"> </div>
              <div class="descricao">
              <p class="nome">Nova tarefa</p>
              <p class="timestamp">Criada em: 15/07/21</p>
          </div>
          </li>
          <li class="tarefa">
              <div class="not-done"></div>
              <div class="descricao">
              <p class="nome">Nova tarefa</p>
              <p class="timestamp">Criada em: 15/07/21</p>
          </div>
          </li>
      </div>`;
  }
  
  /* Eventos */
  taskRef.addEventListener("keyup", (event) => {
    validateDescription(event.target.value);
    validateInput(taskRef);
  });
  
  buttontaskRef.addEventListener("click", (event) => createTask(event));
  finishSessionRef.addEventListener("click", finalizaSession);
  
  /* Invocando Função */
  verificaToken();