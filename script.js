// array donde se guardan tareas
const tareas = [] 
const enProceso = []
const terminado = []


// creamos constantes
const input = document.querySelector('#taskInput')
const boton = document.querySelector('#btn-agregar')

const tarea = document.querySelector('#tareas')
const contenedorEnProceso = document.querySelector('#lista-en-progreso')
const contenedorTerminado = document.querySelector('#lista-hecho')



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

function tareasEnProceso() {
  const arrayPendiente = JSON.parse(localStorage.getItem('enProceso'))
    if (arrayPendiente) {
    arrayPendiente.forEach(function(texto) {
      crearTareaEnProceso(texto)
    })
  }
  console.table(arrayPendiente)
}
tareasEnProceso()

function tareasTerminadas() {
  const arrayPendiente = JSON.parse(localStorage.getItem('terminado'))
    if (arrayPendiente) {
    arrayPendiente.forEach(function(texto) {
      crearTareaTerminado(texto)
    })
  }
  console.table(arrayPendiente)
}
tareasTerminadas()



// funciones
//FUNCIÓN CREAR TAREA/////////////////////////////////////
function crearTarea(texto) {
  tareas.push(texto)
  //li que contiene items y botones
  const li = document.createElement('li')

  //guardamos texto
  const span = document.createElement('span')
  span.innerText = texto

  //creamos botones
  const btnEliminar = document.createElement('button')
  const btnflechaDer = document.createElement('button')
  btnEliminar.innerHTML = '<i class="fa-solid fa-circle-minus"></i>'
  btnflechaDer.innerHTML = '<i class="fa-solid fa-circle-right"></i>'

  //funcion para el botón eliminar//////////////////
  btnEliminar.addEventListener('click', function(elemento) {
    const index = tareas.indexOf(texto)  // usa 'texto' para encontrarlo y eliminarlo del array
    tareas.splice(index, 1)
    li.remove()
    guardarTareas()
  })

  //funcion para el botón de flecha///////////////
  btnflechaDer.addEventListener('click', function() {
    const index = tareas.indexOf(texto)  // busca en el array
    tareas.splice(index, 1)              // elimina de columna 1
    li.remove()                          // elimina del DOM

    crearTareaEnProceso(texto)           // crea el li en la columna del medio
    
    guardarTareas()
    guardarTareasEnProceso()
  })


  //los guardamos en el item
  li.appendChild(span)
  li.appendChild(btnEliminar)
  li.appendChild(btnflechaDer)

  tarea.appendChild(li)

  guardarTareas() //guardamos en localStorage
  
}

//FUNCIÓN AGREGAR TAREA A COLUMNA 'EN PROCESO'/////////////////////////
function crearTareaEnProceso(texto) {
  enProceso.push(texto)
  const li = document.createElement('li')

  const span = document.createElement('span')
  span.innerText = texto

  const btnEliminar = document.createElement('button')
  btnEliminar.innerHTML = '<i class="fa-solid fa-circle-minus"></i>'
  const btnflechaDer = document.createElement('button')
  btnflechaDer.innerHTML = '<i class="fa-solid fa-circle-right"></i>'
  const btnflechaIzq = document.createElement('button')
  btnflechaIzq.innerHTML = '<i class="fa-solid fa-circle-left"></i>'

  //elimina item de la columna del medio
  btnEliminar.addEventListener('click', function(elemento) {
    const index = enProceso.indexOf(texto)
    enProceso.splice(index, 1)
    li.remove()
    guardarTareasEnProceso()
  })

  //devuelve item a la columna de la izqueirda
  btnflechaIzq.addEventListener('click', function() {
      const index = enProceso.indexOf(texto)
      enProceso.splice(index, 1)
      li.remove()

      crearTarea(texto)

      guardarTareas()
      guardarTareasEnProceso()
  })

  //envía tarea a la columna derecha final
  btnflechaDer.addEventListener('click', function() {
    const index = enProceso.indexOf(texto) 
    enProceso.splice(index, 1)              
    li.remove()                         

   crearTareaTerminado(texto)   
    
    guardarTareasEnProceso()
    guardarTareasTerminado()
  })


  //visibilizar items y sus botones
  li.appendChild(span)
  li.appendChild(btnflechaIzq)
  li.appendChild(btnflechaDer)
  li.appendChild(btnEliminar)

  contenedorEnProceso.appendChild(li)
}


//AGREGAR TAREA A COLUMNA 'TERMINADO'//////////////////////////////////////////////////////////
function crearTareaTerminado(texto) {
  terminado.push(texto)
  const li = document.createElement('li')

  const span = document.createElement('span')
  span.innerText = texto

  const btnEliminar = document.createElement('button')
  btnEliminar.innerHTML = '<i class="fa-solid fa-circle-minus"></i>'
  const btnflechaIzq = document.createElement('button')
  btnflechaIzq.innerHTML = '<i class="fa-solid fa-circle-left"></i>'

  //elimina item de la columna del medio
  btnEliminar.addEventListener('click', function(elemento) {
    const index = terminado.indexOf(texto)
    terminado.splice(index, 1)
    li.remove()
    guardarTareasTerminado()
  })

  //devuelve item a la columna del medio
  btnflechaIzq.addEventListener('click', function() {
      const index = terminado.indexOf(texto)
      enProceso.splice(index, 1)
      li.remove()

      crearTareaEnProceso(texto)

      guardarTareas()
      guardarTareasEnProceso()
  })

  //visibilizar items y sus botones
  li.appendChild(span)
  li.appendChild(btnflechaIzq)
  li.appendChild(btnEliminar)

  contenedorTerminado.appendChild(li)
}



////////////////////////////////////////////////////////////////////////////////////////////



//eliminar espacios del input y una vez cargado elemento, borrar contenido
boton.addEventListener('click', function() {
  const texto = input.value.trim()
  crearTarea(texto)
  input.value = ''
})

//USO DE LOCAL STORAGE - guardamos en el mismo, cada item de la lista de tareas - SEGÚN CADA COLUMNA
function guardarTareas() {
  localStorage.setItem('tareas', JSON.stringify(tareas))
}

function guardarTareasEnProceso() {
  localStorage.setItem('enProceso', JSON.stringify(enProceso))
}

function guardarTareasTerminado() {
  localStorage.setItem('terminado', JSON.stringify(terminado))
}