var loginButtonRef = document.querySelector('#btnLogin')
var validEmail = document.querySelector('#validEmail')
var validPassword = document.querySelector('#validPassword')

function authUser(event) {
    event.preventDefault()
}

loginButtonRef.addEventListener('click', (event) => {

    authUser(event)


    // Configuração dos Headers que irão estar da Request
    const requestHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}


    // Atribuição dos valores que o usuário digitou no login.
    var userLoginData = {
        email: validEmail.value,
        password: validPassword.value   
    }

    // Objeto de Configuração da Request
    var requestConfig = {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(userLoginData)
    }


 

    console.log(userLoginData)


    // Envio da Request com os dados de login
    fetch('https://todo-api.ctd.academy/v1/users/login', requestConfig).then(
        response => {
            if(response.ok) {
                response.json().then(
                    data => {
                        localStorage.setItem('authToken', data.jwt)
                        window.location.href = 'https://gabrielcesar48.github.io/Checkpoint-II-ToDo/tarefas.html'
                    }   
                )
            } else {
                alert('O usuário ou senha está incorreto')
            }
        }
    )
})

  

      //gabriel.gabriel48@hotmail.com
      //123456Pereira