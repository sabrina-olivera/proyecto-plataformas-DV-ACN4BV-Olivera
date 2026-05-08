// array donde se guardan tareas
const tareas = [] 


// creamos constantes
const input = document.querySelector('#taskInput')
const boton = document.querySelector('#btn-agregar')
const tarea = document.querySelector('#tareas')

// funciones

function crearTarea(texto) {
  //li que los contiene texto y botones
  const li = document.createElement('li')

  //guardamos texto
  const span = document.createElement('span')
  span.textContent = texto
  console.log(texto)

  //creamos botones
  const btnEliminar = document.createElement('button')
  const btnflechaDer = document.createElement('button')
  btnEliminar.innerHTML = '<i class="fa-solid fa-circle-minus"></i>'
  btnflechaDer.innerHTML = '<i class="fa-solid fa-circle-right"></i>'

  //los guardamos en el item
  li.appendChild(span)
  li.appendChild(btnEliminar)
  li.appendChild(btnflechaDer)

  //ponemos li dentro del contenedor (el div#tareas)
  tarea.appendChild(li)
  
}

boton.addEventListener('click', function() {
  const texto = input.value.trim()
  crearTarea(texto)
  input.value = ''
})