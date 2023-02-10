const input = document.querySelector('#Verificar');
const boton = document.querySelector('#VerificarButton');
const form = document.querySelector('#formulario');

form.addEventListener('submit', e => {
    e.preventDefault();
    data = {username : input.value}
    console.log("qlqlqlqqllq");
    fetch('http://localhost:3003/api/verify', {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(data)
        });
    console.log(data);
})


