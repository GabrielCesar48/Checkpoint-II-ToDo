
// INÍCIO DE VALIDAÇÃO DA TELA DE LOGIN --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Captura o label do email
const labelEmailRef = document.querySelector('#inputEmail')
//Vaptura o label da senha
const labelSenhaRef = document.querySelector('#inputSenha')

//Captura o input do email
const inputEmailRef = document.querySelector('#inputEmail input')
//Captura o input da senha
const inputPasswordRef = document.querySelector('#inputPassword input')


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// Função REGEX de validação do email.
function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  }


// VALIDAR EMAIL LOGIN - Aplicação da função REGEX de validação do Email quando alguma tecla é digitada no campo do email. 
  inputEmailRef.addEventListener('keyup', () => {
    
    var validEmailRef = document.querySelector('.valid__email')

    if (validarEmail(inputEmailRef.value) == false) {        
        validEmailRef.style.display = 'block'

    } else if (validarEmail(inputEmailRef.value) == true) {
        validEmailRef.style.display = 'none'

    }
   
  })

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Função REGEX de validação de senha.
function validarSenha(senha) {
  const regexSenha = /^(?=.*[A-Z])(?=.*\d).{8,20}$/;
  return regexSenha.test(senha);
}


// VALIDAR SENHA LOGIN - Aplicação da função REGEX de validação do Senha quando alguma tecla é digitada no campo do senha. 
inputPasswordRef.addEventListener('blur', () => {
    
  var validSenhaRef = document.querySelector('.valid__senha')

  if (validarSenha(inputPasswordRef.value) == false) {        
    validSenhaRef.style.display = 'block'

  } else if (validarSenha(inputPasswordRef.value) == true) {
    validSenhaRef.style.display = 'none'

  }
 
})





// Habilita botao Login se ambos os campos permanecerem preenchidos.

//Captura botao login
var btnLoginRef = document.querySelector('#btnLogin');

// Previne ação padrão do botao login
btnLoginRef.addEventListener('click', (event) => {
  event.preventDefault();
})
  
// Função que habilita o botao se a validação do email estiver correta e se a senha tiver sido preenchida com algum valor
  function habilitaLogin() {
    
    if (validarEmail(inputEmailRef.value) == true && inputPasswordRef.value > '') {
          btnLoginRef.removeAttribute('disabled') 

    } else {
         btnLoginRef.setAttribute('disabled', 'disabled')
    }
 
  }

  // Chama a função que habilita o login cada vez que é digitado algo nos campos
  inputEmailRef.addEventListener('keyup', habilitaLogin)
  inputPasswordRef.addEventListener('keyup', habilitaLogin)

// FIM DA VALIDAÇÃO DA TELA DE LOGIN -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// INÍCIO DE VALIDAÇÃO DA TELA DE CADASTRO --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

