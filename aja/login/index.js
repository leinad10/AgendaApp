const usernameInput  = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const boton = document.querySelector('#botonSubmit');
const form = document.querySelector("#f");
const mensaje = document.querySelector('#messageFromDB')
const navbarA = document.querySelector('#navbarA');
const botonDrop = document.querySelector('#botonDrop')

form.addEventListener('submit', e => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    const pillo = {username: username, password: password}
    console.log(pillo);
    console.log(username);
    console.log(password);
    const aja = async () => {
        const login = await (fetch('http://localhost:3003/api/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
         },
        body: JSON.stringify(pillo)
        }));
        console.log(login);
        const loginJSON = await login.json();
        console.log(loginJSON);
        if (login.status===400) {
            mensaje.innerHTML=''
            const enviarMensaje = document.createElement('h1');
            enviarMensaje.innerHTML = `${loginJSON.error}`
            mensaje.append(enviarMensaje);
            mensaje.classList.add('lg:flex');
            mensaje.classList.remove('lg:hidden')
            setInterval(() => {
                mensaje.classList.remove('lg:flex');
                mensaje.classList.add('lg:hidden');
            }, 5000);
            setInterval(() => {
                enviarMensaje.innerHTML=''
            }, 5000);
        } else {
            mensaje.innerHTML=''
            const enviarMensaje = document.createElement('h1');
            enviarMensaje.innerHTML = `${loginJSON[0]}`
            mensaje.append(enviarMensaje);
            mensaje.classList.add('show');
            setInterval(() => {
                mensaje.classList.remove('show');
            }, 5000);
            setInterval(() => {
                enviarMensaje.innerHTML=''
            }, 5000);
            localStorage.setItem('Usuario', username)
            window.location.href='../agenda/index.html'
        }
    }

    aja();
    console.log(aja);
});

botonDrop.addEventListener('click', (e) => {
    e.preventDefault();
    navbarA.classList.toggle('fixed');
    navbarA.classList.toggle('hidden');
  })
