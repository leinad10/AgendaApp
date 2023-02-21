//////////////////////////DOM REFERENCES/////////////////////////////////////////////
//////////////////////////DOM REFERENCES/////////////////////////////////////////////
//////////////////////////DOM REFERENCES/////////////////////////////////////////////
const nav = document.querySelector('#nav');
const form = document.querySelector('#form');
const inputNumber = document.querySelector('#input-number');
const inputName = document.querySelector('#input-name');
const lista = document.querySelector('#contacts-list');
const boton2 = document.querySelector('#create-contact');
const contenedorDeNmeros = document.querySelector('.container-contacts');
const li = document.querySelector('li');
const botonBorrar = document.querySelector('.btn-delete');
const botonEditar = document.querySelector('.btn-edit');
const botonGuardar = document.querySelector('.btn-save');
const editar = document.querySelector('.culo');
const error = document.querySelector('.incorrect');
const noError = document.querySelector('.correct');
const eseDiv = document.querySelector('#esta') 
const pName = document.querySelector('#pName');
const pNumber = document.querySelector('#pNumber');
const mensaje = document.querySelector('#messageFromDB')
const botonOut = document.querySelector('#logOut');
const navbarA = document.querySelector('#navbarA');
const botonDrop = document.querySelector('#botonDrop')
//////////////////////////////LOCAL STORAGE REFERENCES/////////////////////////////////////////////
//////////////////////////////LOCAL STORAGE REFERENCES/////////////////////////////////////////////
//////////////////////////////LOCAL STORAGE REFERENCES/////////////////////////////////////////////
const Usuario = localStorage.getItem('Usuario');
//////////////////////////////////////REGEX'S//////////////////////////////////////////////////////
//////////////////////////////////////REGEX'S//////////////////////////////////////////////////////
//////////////////////////////////////REGEX'S//////////////////////////////////////////////////////
const NAME_REGEX = /^[a-zA-Z]{2,10}$/;
const NUMBER_REGEX = /^[4]{1}[1-2]{1}[246]{1}-[0-9]{7}$/;
////////////////////////////// OTHER VARIABLES OR CONSTANTS ///////////////////////////////////////
////////////////////////////// OTHER VARIABLES OR CONSTANTS ///////////////////////////////////////
////////////////////////////// OTHER VARIABLES OR CONSTANTS ///////////////////////////////////////
const botonCrear = form.children[2].attributes;
const disabled = botonCrear[2];
const esta = {username: Usuario}
let validName = false;
let validNumber = false;
/////////////////////////////////////////Funciones/////////////////////////////////////////////////
/////////////////////////////////////////Funciones/////////////////////////////////////////////////
/////////////////////////////////////////Funciones/////////////////////////////////////////////////
// // //  //  //  // Funcion para sacar al usuario de la interfaz  // // // // // // // // // // // 
botonDrop.addEventListener('click', (e) => {
  e.preventDefault();
  navbarA.classList.toggle('fixed');
  navbarA.classList.toggle('hidden');
})


const noAutorizado = (ajam) => {
  const nuevoMensaje = document.createElement('h1')
  console.log(ajam);
  if (ajam.error.includes('token expirado')) {
    nuevoMensaje.innerHTML = `${ajam.error} Inicia secion nuevamente`
    mensaje.append(nuevoMensaje);
    localStorage.setItem('Usuario', '');
    mensaje.classList.add('show')
    setInterval(() => {
      mensaje.classList.remove('show');
      window.location.href = '../loginn/index.html'
    }, 5000);
  } else {
    nuevoMensaje.innerHTML = `${ajam.error} Debes registrarte antes de usar la app`
    mensaje.append(nuevoMensaje);
    localStorage.setItem('Usuario', '');
    mensaje.classList.add('show')
    setInterval(() => {
      mensaje.classList.remove('show');
      window.location.href = '../signup/index.html'
    }, 5000);
  }
    
}
//  //  //  //  Funcion para cargar los contactos del usuario desde la Base de Datos  //  //  // //
const getContactsFromDB = async () => {
  console.log("probando");
  const losContacts = await (fetch('https://leinad-app-0v4f.onrender.com/api/agenda', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    }));
  console.log("probando2");
const contactos = await (losContacts.json());
return contactos;
}
//  // Funcion para revizar la autorizacion del usuario y dejarlo o no continuar en la pagina // // 
const auth = async (esta) => {
  console.log("probando");
  const auth = await (fetch('https://leinad-app-0v4f.onrender.com/api/auth', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(esta)
    }));
  console.log("probando2");
const authValidation = await (auth.json());
return {authValidation, auth};
}
const del = async (esta) => {
  console.log("probando");
  const aja = await (fetch('https://leinad-app-0v4f.onrender.com/api/agenda', {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(esta)
        }));
  console.log("probandodele");
const deilete = await (aja.json());
return {aja, deilete};
}
// // Funcion para cambiar entre editar y guardar los contactos (Practicamente soloe s visual) // /
const showRemove = (evento) => {
  evento[2].classList.toggle('show');
  evento[4].classList.toggle('show');
  evento[6].classList.toggle('show');
  evento[1].classList.toggle('hiden');
  evento[3].classList.toggle('hiden');
  evento[5].classList.toggle('hiden');
 }
//  //  //  //  //  //Funcion para crear elementos en el HTML // //  //  //  //  //  //  //  //  //
const createContactsInHTML = (e) => {
  const newContact = document.createElement('li');
  newContact.innerHTML = `<button id="${e.id}"class="btn-delete">❌</button>
  <p>${e.contactname}</p>
  <input itemid="aja3" type="text" placeholder="${e.contactname}" class="culo" value="${e.contactname}">
  <p>${e.contactNumber}</p>
  <input itemid="aja4" type="text" placeholder="${e.contactNumber}" class="culo" value="${e.contactNumber}">
  <button class="btn-edit">✏️</button>
  <button class="btn-save">💾</button>`;
  newContact.classList.add('contactos');
  lista.append(newContact);
}


/////////////////////////////////////////////// Code Start //////////////////////////////////////////////////////
/////////////////////////////////////////////// Code Start //////////////////////////////////////////////////////
/////////////////////////////////////////////// Code Start //////////////////////////////////////////////////////
getContactsFromDB ().then(contactos => {
  console.log(contactos);
  const aja = contactos.docs
  console.log(aja);
  const eso = aja.filter(e => e.creator===Usuario);
  console.log(eso);
  eso.forEach(element => {
    createContactsInHTML(element);
    
    if (lista.children.length > 0) {
      contenedorDeNmeros.classList.add('block');
      contenedorDeNmeros.classList.remove('hidden');
    }
  });
  console.log(eso);
});

inputName.addEventListener('input', (e) => {
  e.preventDefault();
  if (inputName.value==='') {
    inputName.classList.remove('correct');
    inputName.classList.remove('incorrect');
    pName.classList.add('hiden');
    boton2.classList.remove('hiden');
  } else {
    validName = NAME_REGEX.test(e.target.value)
    if (validName===false) {
      inputName.classList.remove('correct');
      inputName.classList.add('incorrect');
      pName.classList.remove('hiden');
      boton2.classList.add('hiden');
    } else {
      inputName.classList.remove('incorrect');
      inputName.classList.add('correct');
      boton2.classList.remove('hiden');
      pName.classList.add('hiden');
    }
    
    if (validName === true && validNumber === true) {
      boton2.disabled = false;
    } else boton2.disabled = true;
  }
});
  
inputNumber.addEventListener('input', (e) => {
  e.preventDefault();
  if (inputNumber.value==='') {
    inputNumber.classList.remove('correct');
    inputNumber.classList.remove('incorrect');
    pNumber.classList.add('hiden');
    boton2.classList.remove('hiden');
  } else {
    validNumber = NUMBER_REGEX.test(e.target.value)
    if (validNumber===false) {
      inputNumber.classList.remove('correct');
      inputNumber.classList.add('incorrect');
      pNumber.classList.remove('hiden');
      boton2.classList.add('hiden');
    } else {
      inputNumber.classList.remove('incorrect');
      inputNumber.classList.add('correct');
      boton2.classList.remove('hiden');
      pNumber.classList.add('hiden');
    }
  
    if (validName === true && validNumber === true) {
      boton2.disabled = false;
    } else boton2.disabled = true;
  }
});

form.addEventListener('submit',async (event) => {
  event.preventDefault();
  const nameValue = inputName.value;
  const numberValue = inputNumber.value;
  const contactData = {
    username: Usuario,
    name: nameValue,
    number: numberValue,
  }
  console.log(Usuario);
  
  auth(esta).then( (e => {
    if (e.auth.status === 400) {
        noAutorizado(e.authValidation);
    } else {
        (fetch('https://leinad-app-0v4f.onrender.com/api/agenda', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(contactData)
        }));
        getContactsFromDB().then(verContacts =>{
        const esos = verContacts.docs
        const contactsDB = esos.filter(e => e.creator===Usuario);
        const index = contactsDB.length - 1
        const lastContact = contactsDB[index];
        createContactsInHTML(lastContact);
        inputName.value = '';
        inputNumber.value = '';
        console.log(lista.children.length);
        inputName.classList.remove('correct');
        inputName.classList.remove('incorrect');
        inputNumber.classList.remove('incorrect');
        inputNumber.classList.remove('correct');
        boton2.disabled = true;
        validName = false;
        validNumber = false;
        if (lista.children.length > 0) {
          contenedorDeNmeros.classList.add('show');
        }
        })
    }  
  }))
});

lista.addEventListener('click', async (event) => {
  const boton = event.target;
  if (event.target.classList.contains('btn-delete')) {
    auth(esta).then( (e => {
      if (e.auth.status === 400) {
          noAutorizado(e.authValidation);
      } else {
        const id = boton.id
        console.log(id);
        const data = `ObjectId("${id}")`;
        console.log(data);
        del (data);
        
        boton.parentElement.remove();
        if (lista.children.length === 0) {
          contenedorDeNmeros.classList.remove('block');
          contenedorDeNmeros.classList.add('hidden');

        } 
      }
    }))
  }
    // console.log(event.target);
  if (event.target.classList.contains('btn-edit')) {
    const evento = event.target.parentElement.children
    console.log(evento[0]);
    showRemove(evento);
  }
  //
 

  //
  if (event.target.classList.contains('btn-save')) {
    const evento = event.target.parentElement.children
    const inputName2 = evento[2];
    const inputNumber2 = evento[4];
    const name2 = evento[1];
    const number2 = evento[3];
    showRemove(evento);
    console.log(inputName2.value);
    console.log(name2.innerHTML);
    name2.innerHTML = `${inputName2.value}`;
    number2.innerHTML = `${inputNumber2.value}`;
    const id = event.target.parentElement.children[0].id
    const contactNumber = inputNumber2.value
    const contactname = inputName2.value
    const data = {
      id: id,
      contactname: contactname,
      contactNumber: contactNumber
    }
    console.log(data);
    auth(esta).then( (e => {
      if (e.auth.status === 400) {
          noAutorizado(e.authValidation);
      } else {
        (fetch('https://leinad-app-0v4f.onrender.com/api/agenda', {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(data)
        }));
        // localStorage.setItem('listas', lista.innerHTML);
      }  
      })
    )}
});

botonOut.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.setItem('Usuario', '');
  nuevoMensaje.innerHTML = `Su secion a sido cerrada satisfactoriamente`
  mensaje.append(nuevoMensaje);
  localStorage.setItem('Usuario', '');
  mensaje.classList.add('show')
  setInterval(() => {
    mensaje.classList.remove('show');
    nuevoMensaje.innerHTML = ''
    window.location.href = '../loginn/index.html'
  }, 3000);
});

