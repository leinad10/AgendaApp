const input = document.querySelector('#Verificar');
const boton = document.querySelector('#VerificarButton');
const form = document.querySelector('#formulario');

form.addEventListener('submit', e => {
    e.preventDefault();
    data = {username : input.value}
    console.log("qlqlqlqqllq");
    fetch('https://leinad-app-0v4f.onrender.com/api/verify', {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(data)
        });
    console.log(data);
});

botonDrop.addEventListener('click', (e) => {
  e.preventDefault();
  navbarA.classList.toggle('fixed');
  navbarA.classList.toggle('hidden');
})

