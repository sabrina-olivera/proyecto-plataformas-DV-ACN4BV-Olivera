// array donde se guardan tareas
const tareas = [] 


// creamos constantes
const input = document.querySelector('#taskInput')
const boton = document.querySelector('#btn-agregar')
const tarea = document.querySelector('#tareas')

// funciones
function crearTarea(texto) {
  // guardamos en array
  tareas.push(texto)
  console.log(tareas.texto)

  // creamos item y lo agrega dinámicamente
  const li = document.createElement('li')
  li.innerText = texto
  tarea.appendChild(li)
}

boton.addEventListener('click', function() {
  const texto = input.value.trim()
  crearTarea(texto)
  input.value = ''
  console.log('llego btn')
})