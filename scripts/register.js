

btnCadastroRef.addEventListener('click', () => {

var userData = {
        firstName:  inputFirstNameRef.value,
        lastName:   inputLastNameRef.value,
        email:      inputEmailRef.value,
        password:   inputValidPasswordRef.value   
}

const requestHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}


var requestConfig = {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(userData)
}


    fetch('https://todo-api.ctd.academy/v1/users', requestConfig).then(
    response => {
        if(response.ok) {

            alert('Você foi cadastrado com sucesso')

            window.location.href = 'https://gabrielcesar48.github.io/Checkpoint-II-ToDo/index.html'

        } else {

            alert('O usuário ja foi cadastrado')

            window.location.href = 'https://gabrielcesar48.github.io/Checkpoint-II-ToDo/index.html'
        }
    }
)

})

