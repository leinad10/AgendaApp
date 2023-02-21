


const usernameInput = document.querySelector('#usuarioInput');
const usernameP = document.querySelector('#p-username');
const emailInput = document.querySelector('#emailInput');
const formulario = document.querySelector("#formulario")
const paswordInput = document.querySelector('#contraseñaInput');
const verificarPasword = document.querySelector('#validacionContraseñaInput');
const btn = document.querySelector('#boton-registrar');
const mensaje = document.querySelector('#messageFromDB');
const navbarA = document.querySelector('#navbarA');
const botonDrop = document.querySelector('#botonDrop')
// console.log(listaPaises);



let usernameValidation = false;
let emailValidation = false;
let numberValidation = false;
let paswordValidation = false;

const validation = (input, regexValidation) => {
  btn.disabled =
    !usernameValidation ||
    !emailValidation ||
    !paswordValidation
      ? true
      : false;
  if (usernameInput.valuet==='') {
    usernameInput.classList.remove('correct')
    usernameInput.classList.remove('incorrect')
  }
  if (emailInput.valuet==='') {
    emailInput.classList.remove('correct')
    emailInput.classList.remove('incorrect')
  }
  if (paswordInput.value==='') {
    paswordInput.classList.remove('correct')
    paswordInput.classList.remove('incorrect')
  }
  if (verificarPasword.value==='') {
    verificarPasword.classList.remove('correct')
    verificarPasword.classList.remove('incorrect')
  }
  if (!regexValidation && input.value !== '') {
    input.parentElement.children[1].classList.add('show');
    input.classList.add('incorrect');
    input.classList.remove('correct');
  } else if (regexValidation) {
    input.parentElement.children[1].classList.remove('show');
    input.classList.add('correct');
    input.classList.remove('incorrect');
  } else if (input.value === '') {
    input.parentElement.children[1].classList.remove('show');
    input.classList.remove('incorrect');
    input.classList.remove('correct');
  }
};

usernameInput.addEventListener('input', e => {
  const USERNAME_REGEX = /^(?=.*[a-z])[a-z0-9].{3,24}$/;
  usernameValidation = USERNAME_REGEX.test(e.target.value);
  validation(usernameInput, usernameValidation);
});

emailInput.addEventListener('input', e => {
  const EMAIL_REGEX =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  emailValidation = EMAIL_REGEX.test(e.target.value);
  validation(emailInput, emailValidation);
});

paswordInput.addEventListener('input', e => {
  const PASWORD_REGEX =
    /^(?=.*[a-z])(?=.*[0-9])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{4,24}$/;
  paswordValidation = PASWORD_REGEX.test(e.target.value);
  validation(paswordInput, paswordValidation);
  paswordMatch = e.target.value === verificarPasword.value;
  console.log(paswordMatch);
  validation(verificarPasword, paswordMatch);
});

verificarPasword.addEventListener('input', e => {
  paswordMatch = paswordInput.value === e.target.value;
  console.log(paswordMatch);
  validation(verificarPasword, paswordMatch);
});

formulario.addEventListener('submit', e => {
  e.preventDefault();
  const registroUser = {
    username : usernameInput.value,
    email : emailInput.value,
    password : paswordInput.value,

  }
  const aja = async () => {
    console.log(registroUser);
    console.log(JSON.stringify(registroUser));
    try {
      const registro = await (fetch('https://leinad-app-0v4f.onrender.com/api/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(registroUser)
    }));
    const registroJSON = await registro.json();
    return {registro,registroJSON}
  }
    catch {
      console.log('error');
      console.log(error.message);
      console.log(error);
    } 
  }; 
  aja().then(contactos => {
    console.log(contactos.registroJSON);
    console.log(contactos.registro);
    if (contactos.registro.status === 400) {
      mensaje.innerHTML=''
      const enviarMensaje = document.createElement('h1');
      enviarMensaje.innerHTML = `${contactos.registroJSON.error}`
      mensaje.append(enviarMensaje);
      mensaje.classList.add('flex');
      mensaje.classList.remove('hidden');
      setInterval(() => {
        mensaje.classList.remove('flex');
        mensaje.classList.add('hidden')
      }, 5000);
    } else {
      console.log("jajaj");
        mensaje.innerHTML = ''
        const enviarMensaje = document.createElement('h1');
        enviarMensaje.innerHTML = `Usuario Creado satisfactoriamente`
        mensaje.append(enviarMensaje);
        mensaje.classList.add('flex');
        mensaje.classList.remove('hidden');
        setInterval(() => {
          mensaje.classList.add('hidden');
          mensaje.classList.remove('flex');
        }, 5000);
        usernameInput.value = ''
        emailInput.value = ''
        paswordInput.value = ''
        verificarPasword.value = ''
        usernameValidation = false;
        emailValidation = false;
        numberValidation = false;
        paswordValidation = false;
        validation(verificarPasword, paswordMatch);
        validation(emailInput, emailValidation);
        validation(usernameInput, usernameValidation);
        setInterval(() => {
          window.location.href = '../loginn/index.html'
        }, 3000);
    }
  })
  console.log(aja);
});

botonDrop.addEventListener('click', (e) => {
  e.preventDefault();
  navbarA.classList.toggle('fixed');
  navbarA.classList.toggle('hidden');
})