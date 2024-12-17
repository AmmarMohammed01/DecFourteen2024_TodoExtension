let list = JSON.parse( localStorage.getItem('todo-extension-list') );

if(!list) {
  list = [];
}

//Grab input and output elements
const inputElement = document.querySelector('.js-task-input');
const outputElement = document.querySelector('.js-task-output');

//Test to see if correct element is grabbed
console.log(inputElement);
console.log(outputElement);

//Add task: Get the input value when user presses 'Enter'
inputElement.addEventListener('keydown', () => {
  if(event.key === 'Enter') {
    list.push(inputElement.value);
    saveToStorage();

    renderList();
    inputElement.value = '';
  }
});

//render tasks on screen
function renderList() {
  //render list
  let generateHTML = '';
  list.forEach( (task, index) => {
    generateHTML += `<div>${task} <button class="js-delete-button" data-id="${index}">Delete</button> </div>`
  });
  outputElement.innerHTML = generateHTML;

  //delete task buttons
  const deleteButton = document.querySelectorAll('.js-delete-button');
  deleteButton.forEach((button) => {
    button.addEventListener('click', () => {
      deleteTask(button.dataset.id);
    });
  });
}

//Deletes a task from list and renders updated list.
function deleteTask(index) {
  let deleted = list.splice(index, 1);
  saveToStorage();
  
  console.log(`Deleted: ${deleted}`);
  renderList();
  
}

function saveToStorage() {
  localStorage.setItem('todo-extension-list', JSON.stringify(list));
}

renderList(); //render list at runtime
console.log(list);  