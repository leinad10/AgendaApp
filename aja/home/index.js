const navMobil = document.querySelector('.nav-mobil');
const boton = document.querySelector('#imagen');
const nav = document.querySelector('#nav-bar');
const body = document.querySelector('body');
const navbarA = document.querySelector('#navbarA');

const botonDrop = document.querySelector('#botonDrop')

boton.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(e.target);
  if (e.target.classList.contains('span')) {
    navMobil.classList.toggle('nav-mobil-display');
  } else {
    navMobil.classList.remove('nav-mobil-display');
  }
});





