const apiUrl= "https://jsonplaceholder.typicode.com/todos";




const getTodos=()=>{
    fetch(apiUrl+'?_limit=5')
    .then(res=>res.json())
    .then(data=>data.forEach(
        todo=>{addToDoToDOM(todo)
            // console.log(todo)

        }))
        
       
}

const createTodo=(e)=>{
    e.preventDefault();
    
    const newTodo={
        // userId:1,
        title:e.target.firstElementChild.value,
        // id:6,
        completed:false
    }
    
    fetch(apiUrl,{
        method:'POST',
        body:JSON.stringify(newTodo),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(res=>res.json())
    .then(data=>addToDoToDOM(data))
    
};


const addToDoToDOM =(todo)=>{
    const div=document.createElement('div');
    div.classList.add('todo');
    const text= document.createTextNode(todo.title)
    div.setAttribute('data-id',todo.id)

    if(todo.completed){
        div.classList.add('done')
    }
    div.appendChild(text)
    document.getElementById('todo-list').append(div)
}
const toggleCompleted=(e)=>{
    if(e.target.classList.contains('todo')){
        e.target.classList.toggle('done');

        updateTodo(e.target.dataset.id, e.target.classList.contains('done'));
    }
   
    
}

const updateTodo=(id, completed)=>{
    // console.log(id,completed);
    fetch(`${apiUrl}/${id}`,{
        method:'PUT',
        body:JSON.stringify({completed}),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(res=>res.json())
    .then(data=>console.log(data));
};

const deleteTodo=(e)=>{
    if(e.target.classList.contains('todo')){
      const id = e.target.dataset.id;
      fetch(`${apiUrl}/${id}`,{
        method:'DELETE',        
      }).then(res=>res.json())
      .then(()=>e.target.remove())
      
    }
}



const init=()=>{
    document.addEventListener('DOMContentLoaded',getTodos())
    document.querySelector('#todo-form').addEventListener('submit',createTodo);
    document.querySelector('#todo-list').addEventListener('click',toggleCompleted)
    document.querySelector('#todo-list').addEventListener('dblclick',deleteTodo);
}
init()