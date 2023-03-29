const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')


// load all eventlistener
loadEventListener()

function loadEventListener(){
    //load DOM event
    document.addEventListener('DOMContentLoaded' , getTasks)

    //add task event
    form.addEventListener('submit', addTask);
    
    // remove tasks
    taskList.addEventListener('click', removeTask)

    // clear btn
    clearBtn.addEventListener('click', clearTasks)

    //filter tasks
    filter.addEventListener('keyup' , filterTask)
}

function addTask(e){
    // if submit without any task
    if(taskInput.value === ''){
        alert('add a task')
    }

    //create li element
    const li = document.createElement('li')
    //add class
    li.className = 'collection-item'
    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value))

    // create new link
    const link = document.createElement('a')
    // add class 
    link.className = 'delete-item secondary-content'
    // add icon to link
    link.innerHTML = '<i class="fa fa-remove"></i>'
    //add to link to li
    li.appendChild(link)
    //add the li to collection(inside the ul element)
    taskList.appendChild(li)

    //after we add li into ul we need to store this into local storage
    StorTaskInLocalStorage(taskInput.value)
    
    // clear task input
    taskInput.value = ''

    // preventing the default behaviour of page
    e.preventDefault()
}


// remove tasks
function removeTask(e){
    // we are using parentelement bcs if we click on the cross then we get the i tag but we need to get the a link tag and a is the parent of i
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure')){
            e.target.parentElement.parentElement.remove()
        }
    }


    // REMOVE FROM LOCAL STORAGE
    removeFromLocalStorage(e.target.parentElement.parentElement)
}

// clear tasks through btn
function clearTasks(e){
    // taskList.innerHTML = ''

    // faster Way
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild)
    }

    //clear from LC
    clearTaskFromLocalStorage()
}

// filter the task
function filterTask(e){
    // get whatever we are typing in the filter input
    const text = e.target.value.toLowerCase()
    
    // queryselectorall gives us the nodelist of list element and n this nodelist we can apply foreeach method in that we are passing a function and (task) is an iterator here which takes the value of list element one by one
    document.querySelectorAll('.collection-item').forEach(function(task){
        console.log(task)
        const item = task.firstChild.textContent;
        console.log(item)
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block'
        }else{
            task.style.display = 'none'
        }
    })
    // console.log(text)
}

/* LOCAL STORAGE WORK */

// STORE IN LOCAL STORAGE
function StorTaskInLocalStorage(task) {
    let tasks;
    // we need to see if there is any task(element) inside the LS
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task)
    // setting the local storage
    localStorage.setItem('tasks' , JSON.stringify(tasks))
}


// get tasks from LOCAL STORAGE
function getTasks(){
    let tasks;
    // we need to see if there is any task(element) inside the LS
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task){
        //create li element
        const li = document.createElement('li')
        //add class
        li.className = 'collection-item'
        //create text node and append to li
        li.appendChild(document.createTextNode(task))

        // create new link
        const link = document.createElement('a')
        // add class 
        link.className = 'delete-item secondary-content'
        // add icon to link
        link.innerHTML = '<i class="fa fa-remove"></i>'
        //add to link to li
        li.appendChild(link)
        //add the li to collection(inside the ul element)
        taskList.appendChild(li)
    })
}

// remove from LS
function removeFromLocalStorage(taskItem){
    let tasks;
    // we need to see if there is any task(element) inside the LS
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1)
        }
    })

    localStorage.setItem('tasks' ,JSON.stringify(tasks))
}


function clearTaskFromLocalStorage(){
    localStorage.clear()
}