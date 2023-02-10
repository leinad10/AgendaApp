const navMobil = document.querySelector('.nav-mobil');
const boton = document.querySelector('#imagen');
const nav = document.querySelector('#nav-bar');
const body = document.querySelector('body');
const navbarA = document.querySelector('#navbarA');
const botonDrop = document.querySelector('#botonDrop')

botonDrop.addEventListener('click', (e) => {
  e.preventDefault();
  navbarA.classList.toggle('fixed');
  navbarA.classList.toggle('hidden');
})





