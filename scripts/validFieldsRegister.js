
// INÍCIO DE VALIDAÇÃO DA TELA DE LOGIN --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Captura o label do nome
const labelFirstNameRef = document.querySelector('#inputFirstName');
//Captura o label do último nome
const labelLastNameRef = document.querySelector('#inputLastName');
//Captura o label do email
const labelEmailRef = document.querySelector('#inputEmail');
//Captura o label da senha
const labelSenhaRef = document.querySelector('#inputPassword');
//Captura o label de conferencia de senha
const labelValidSenhaRef = document.querySelector('#inputValidPassword')


//Captura o input do nome
const inputFirstNameRef = document.querySelector('#inputFirstName input')
//Captura o input do último nome
const inputLastNameRef = document.querySelector('#inputLastName input')
//Captura o input do email
const inputEmailRef = document.querySelector('#inputEmail input');
//Captura o input da senha
const inputPasswordRef = document.querySelector('#inputPassword input');
//Captura o input de conferencia de senha
const inputValidPasswordRef = document.querySelector('#inputValidPassword input');



//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//VALIDAR NOME CADASTRO

// Função REGEX de validação de nome
function validarNome(nome) {
    const regexNome = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\u0020\u002d\u0027]+$/;
    return regexNome.test(nome)
}
// A expressão regular acima especifica que o campo de nome deve conter apenas letras (maiúsculas e minúsculas), acentos (como ã, á, é, í, ó, ú, ç, etc), espaços, hífens e apóstrofos.

// VALIDAR NOME CADASTRO - Aplicação da função REGEX de validação do nome quando alguma tecla é digitada no campo do nome. 
inputFirstNameRef.addEventListener('blur', () => {
    var validFirstNameRef = document.querySelector('.valid__fist_name');

    if (validarNome(inputFirstNameRef.value) == false || inputFirstNameRef.value.length < 4) {
        validFirstNameRef.style.display = 'block'
    } else if (validarNome(inputFirstNameRef.value) == true && inputFirstNameRef.value.length >= 4) {
        validFirstNameRef.style.display = 'none'
    }
})

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// VALIDAR SOBRENOME CADASTRO - Aplicação da função REGEX de validação do sobrenme quando alguma tecla é digitada no campo do sobrenome.
inputLastNameRef.addEventListener('blur', () => {
    var validLastNameRef = document.querySelector('.valid__last_name');

    if (validarNome(inputLastNameRef.value) == false || inputLastNameRef.value.length < 6) {
      validLastNameRef.style.display = 'block'
    } else if (validarNome(inputLastNameRef.value) == true && inputLastNameRef.value.length >= 6) {
      validLastNameRef.style.display = 'none'
    }
})

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Função REGEX de validação do email.
function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  }


// VALIDAR EMAIL LOGIN - Aplicação da função REGEX de validação do Email quando alguma tecla é digitada no campo do email. 
  inputEmailRef.addEventListener('blur', () => {
    
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

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// VALIDAR REPETIÇÃO DE SENHA - Validar se a repetição da senha é igual a senha anterior.

function validarRepSenha(senha) {
  if (senha === inputPasswordRef.value) {
    return true
  } else {
    return false
  }
}

inputValidPasswordRef.addEventListener('keyup', () => {

  var validRepSenhaRef = document.querySelector('.valid__rep_senha')

  if (validarRepSenha(inputValidPasswordRef.value) === false) {
    validRepSenhaRef.style.display = 'block'
  } else if (validarRepSenha(inputValidPasswordRef.value) === true) {
    validRepSenhaRef.style.display = 'none'
  }

})

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Captura botao login
var btnCadastroRef = document.querySelector('#btnRegister');

// Previne ação padrão do botao login
btnCadastroRef.addEventListener('click', (event) => {
  event.preventDefault();
})
  
// Função que habilita o botao se as validações estiverem corretas

  function habilitaCadastro() {
    
    if (( validarNome(inputFirstNameRef.value) == true && inputFirstNameRef.value.length >= 4
    &&    validarNome(inputLastNameRef.value) == true && inputLastNameRef.value.length >= 6
    &&    validarEmail(inputEmailRef.value) == true
    &&    validarSenha(inputPasswordRef.value) == true
    &&    validarRepSenha(inputValidPasswordRef.value) === true)) {
      btnCadastroRef.removeAttribute('disabled') 

    } else {
      btnCadastroRef.setAttribute('disabled', 'disabled')
    }
 
  }

//   // Chama a função que habilita o login cada vez que é digitado algo nos campos

  inputFirstNameRef.addEventListener('keyup', habilitaCadastro)
  inputLastNameRef.addEventListener('keyup', habilitaCadastro)
  inputEmailRef.addEventListener('keyup', habilitaCadastro)
  inputPasswordRef.addEventListener('keyup', habilitaCadastro)
  inputValidPasswordRef.addEventListener('keyup', habilitaCadastro)

// FIM DA VALIDAÇÃO DA TELA DE LOGIN -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// INÍCIO DE VALIDAÇÃO DA TELA DE CADASTRO --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

