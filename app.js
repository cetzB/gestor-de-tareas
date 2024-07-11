//convertimos al formulario en una constante
const form= document.getElementById('formTask'); 


//Le agregamos al formulario la función 'saveTask' cada que se haga click al botón save
form.addEventListener('submit', saveTask)

//saveTask crea las tareas, resetea ek firmulario y actualiza las tarea
function saveTask(e){
    //Obtenemos el título y la descripción de tareas obtenidas por el usuario
    const title= document.getElementById('title').value;
    const description= document.getElementById('description').value;
    //Convertimos el título y la descripción a un objeto
    const task= {
        title,
        description   
    }
    //Si no existen tareas guardadas en el localstorage se crea la lista de tareas, se le agrega la tarea actual y se guarda en 
    //el localstorage como string
    if(localStorage.getItem('tasks') === null){
        let tasks = []; 
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks))
    } else{
    //Si ya existen tareas en la lista, obtenemos las tareas en string, las convertimos en 
    //objeto, se le agrega la última tarea y esta se guarda en el local storage como string
       let tasks= JSON.parse(localStorage.getItem('tasks')); 
       tasks.push(task);
       localStorage.setItem('tasks', JSON.stringify(tasks)); 
    }
    //actualizamos la lista de tarea
    getTask(); 
    //Formateamos los campos del formulario
    form.reset(); 
    //Evita que la página se refresque en automático, al no envíar datos a servidores externos 
    //Y al nosotros llevar todas las acciones en local, evitamos este comportamiento por defecto
    e.preventDefault(); 
}

function getTask(){
    //Obtenemos las tareas en objeto 
    let tasks= JSON.parse(localStorage.getItem('tasks')); 
    //Obtenemos el div donde se presentarán las tareas al usuario
    let taskView= document.getElementById('tasks');
    
    //creamos el contenedor vacío
    taskView.innerHTML= '';
    //Recorremos las tareas
    for(let i = 0; i < tasks.length; i++){
        //cada vuelta se obtiene el título y la descripción de cada tarea
        let title= tasks[i].title; 
        let description= tasks[i].description; 
        //Añadimos al contenedor el título y la descripción formateado en HTML con un botón de eliminar que llama a la función delete
        taskView.innerHTML += `<div class='card mb-3'>
            <div class='card-body'>
                <p>${title} -${description}</p>
                <a class='btn btn-danger' onclick="deleteTask('${title}')">
                    DELETE
                </a>
            </div>
        </div>`
    }   
}

function deleteTask(title){
    //Obtenemos la lista de tareas como objetos
    let tasks= JSON.parse(localStorage.getItem('tasks'));
    //recorremos las tareas en busca del título a eliminar
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].title == title)
            //Una vez encontrado el título lo eliminamos
            tasks.splice(i);
    }
    //Envíamos la lista de objetos como string al localstorage sin la tarea removida
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
    //actualizamos
    getTask(); 
}

//Se llama siempre al getTask para mostrar las tareas al usuario
getTask(); 