'use strict'

const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const toDoList = document.querySelector('.todo-list')
const toDoCompleted = document.querySelector('.todo-completed')
let toDoData = []

const render = () => {
    toDoList.innerHTML = ''
    toDoCompleted.innerHTML = ''
    toDoData.forEach((item, index) => {
        const li = document.createElement('li')

        li.classList.add('todo-item')

        li.innerHTML = `
                    <span class="text-todo">${item.text}</span>
                    <div class="todo-buttons">
                        <button class="todo-remove"></button>
                        <button class="todo-complete"></button>
                    </div>
        `
        if (item.completed) {
            toDoCompleted.append(li)
        } else {
            toDoList.append(li)
        }
        li.querySelector('.todo-complete').addEventListener('click', () => {
            item.completed = !item.completed
            render()
            localStorage.setItem('toDo', JSON.stringify(toDoData))
        })
        li.querySelector('.todo-remove').addEventListener('click', () => {
            toDoData.splice(index, 1)
            render()
            localStorage.setItem('toDo', JSON.stringify(toDoData))
        })
    })
}

todoControl.addEventListener('submit', (e) => {
    e.preventDefault()
    if (headerInput.value.trim() !== '') {
        const newToDo = {
            text: headerInput.value,
            completed: false
        }
        toDoData.push(newToDo)
        headerInput.value = ''
        render()
    }
    localStorage.setItem('toDo', JSON.stringify(toDoData))
})

if (localStorage.getItem('toDo')) {
    toDoData = JSON.parse(localStorage.getItem('toDo'))
    render()
}
