const section = document.querySelector('#home');
// console.log(section.innerHTML)
const divisorUno = document.querySelector('#contenedor-del-titulo');
// console.log(divisorUno.innerHTML)
const h1 = document.querySelector('#titulo-delcontenedor');
// console.log(h1.innerHTML);
const formulario = document.querySelector('#section-form');
// console.log(formulario.innerHTML);
const input = document.querySelector('#input-text');
// console.log(input.values);
const boton = document.querySelector('#boton-formulario');
// console.log(boton.innerHTML)
const divisorDos = document.querySelector('#contenedor-de-lista');
// console.log(divisorDos.innerHTML);
const lista = document.querySelector('#contenedor-de-tareas');
const listItem = document.querySelector('.list-item');
const botonBorrar = document.querySelector('delete-btn');
const textArea = document.querySelector('textarea');
// console.log(lista.innerHTML);
// localStorage.clear('lista');
lista.innerHTML = localStorage.getItem('lista');
const listas = document.querySelector('li');
const ol = document.querySelector('ol');
const li = ol.children;
let aja = ol.children.length;

console.log(input);
let vacio = true;

if (lista.children.length > 0) {
  divisorDos.classList.add('show');
  divisorUno.classList.add('borde');
}

input.addEventListener('input', (e) => {
  e.preventDefault();
  // console.log(input.value);
  if (input.value === '') {
    vacio = true;
  } else {
    vacio = false;
  }
  if (vacio === true) {
    boton.disabled = true;
  } else {
    boton.disabled = false;
  }
});
if (vacio === true) {
  boton.disabled = true;
} else {
  boton.disabled = false;
}

formulario.addEventListener('submit', (event) => {
  event.preventDefault();
  let aja = ol.children.length; //variable la cual puedo usar para entrar en el hijo del ol
  //
  const valueInput = input.value;
  const elementoLista = document.createElement('l1');
  elementoLista.innerHTML = `
    <button id=boton-borrar-${aja} class="delete-btn" type="submit">❌</button>
    <p>${valueInput}</p>
    <textarea id="input-2" type="text" class="hidden" value="${valueInput}" rows="1">${valueInput}</textarea>
    <button class="edit-btn">✏️</button>
    <button class="guardar-btn hidden">💾</button>
    `;
  lista.append(elementoLista);
  // console.log(valueInput);
  input.value = '';
  const li = ol.children;
  li[aja].classList.add('claseLista');
  if (lista.children.length > 0) {
    divisorDos.classList.add('show');
    divisorUno.classList.add('borde');
  }
  localStorage.setItem('lista', lista.innerHTML);
  // console.log(vacio);
  boton.disabled = true;
});
// console.log(ol.children.length);
// console.log(ol.children);

lista.addEventListener('click', (e) => {
  e.preventDefault();
  const aja = e.target;
  if (e.target.classList.contains('delete-btn')) {
    aja.parentElement.remove();
    if (lista.children.length === 0) {
      divisorDos.classList.remove('show');
      divisorUno.classList.remove('borde');
    }
  }
  localStorage.setItem('lista', lista.innerHTML);
  if (e.target.classList.contains('edit-btn')) {
    const parrafo = aja.parentElement.children[1];
    const input2 = aja.parentElement.children[2];
    const botonEditar = aja.parentElement.children[3];
    const botonGuardar = aja.parentElement.children[4];

    parrafo.classList.add('hidden');
    input2.classList.remove('hidden');
    botonEditar.classList.add('hidden');
    botonGuardar.classList.remove('hidden');

    lista.addEventListener('keyup', (event) => {
      // console.log(input2.style.height);
      // console.log(lista.height);
      input2.style.height = 'auto';
      // console.log(input2.style.height.value);
      let tasHeight = input2.scrollHeight;
      input2.style.height = `${tasHeight}px`;
      // console.log(tasHeight);
    });
  }
  if (e.target.classList.contains('guardar-btn')) {
    const parrafo = aja.parentElement.children[1];
    const input2 = aja.parentElement.children[2];
    const botonEditar = aja.parentElement.children[3];
    const botonGuardar = aja.parentElement.children[4];
    // console.log(input2.value);

    if (input2.value === '') {
      alert('No se puede guardar la nota vacia');
      botonEditar.classList.remove('hidden');
      botonGuardar.classList.add('hidden');
      parrafo.classList.remove('hidden');
      input2.classList.add('hidden');
      input2.value = parrafo.innerHTML;
    } else {
      // console.log(input2.value);
      parrafo.classList.remove('hidden');
      input2.classList.add('hidden');
      botonEditar.classList.remove('hidden');
      botonGuardar.classList.add('hidden');

      input2.value.split('/n/'); // separar el string
      console.log(input2.value.split('\n').join('<br>')); // une un salto de linea al string en un console.log para testear

      parrafo.innerHTML = `${input2.value.split('\n').join('<br>')}`; // se ejecuta la aplicacion del salto de linea
      localStorage.setItem('lista', lista.innerHTML);
    }
  }
});
