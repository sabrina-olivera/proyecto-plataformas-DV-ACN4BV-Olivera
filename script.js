// array donde se guardan tareas
const tareas = [] 


// creamos constantes
const input = document.querySelector('#taskInput')
const boton = document.querySelector('#btn-agregar')
const tarea = document.querySelector('#tareas')


//visualizar estado del localStorage desde consola
function cargarTareas() {
  const arrayPendiente = JSON.parse(localStorage.getItem('tareas'))
    if (arrayPendiente) {
    arrayPendiente.forEach(function(texto) {
      crearTarea(texto)
    })
  }
  console.table(arrayPendiente)
}
cargarTareas()

// funciones
function crearTarea(texto) {
  tareas.push(texto)
  //li que contiene items y botones
  const li = document.createElement('li')

  //guardamos texto
  const span = document.createElement('span')
  span.innerText = texto
  console.log(texto)

  //creamos botones
  const btnEliminar = document.createElement('button')
  const btnflechaDer = document.createElement('button')
  btnEliminar.innerHTML = '<i class="fa-solid fa-circle-minus"></i>'
  btnflechaDer.innerHTML = '<i class="fa-solid fa-circle-right"></i>'

  btnEliminar.addEventListener('click', function(elemento) {
    const index = tareas.indexOf(texto)  // usa 'texto' para encontrarlo y eliminarlo del array
    tareas.splice(index, 1)
    li.remove()
    guardarTareas()
  })

  //los guardamos en el item
  li.appendChild(span)
  li.appendChild(btnEliminar)
  li.appendChild(btnflechaDer)

  tarea.appendChild(li)

  guardarTareas() //guardamos en localStorage
  
}

boton.addEventListener('click', function() {
  const texto = input.value.trim()
  crearTarea(texto)
  input.value = ''
})

//USO DE LOCAL STORAGE - guardamos en el mismo, cada item de la lista de tareas
function guardarTareas() {
  localStorage.setItem('tareas', JSON.stringify(tareas))
}
