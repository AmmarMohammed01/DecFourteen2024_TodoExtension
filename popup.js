let list = JSON.parse( localStorage.getItem('todo-extension-list') );

if(!list) {
  list = [];
  //list = [{taskName: "name", isComplete: true}];
}

//Grab input and output elements
const inputElement = document.querySelector('.js-task-input');
const addButtonElement = document.querySelector('.js-add-button');
const outputElement = document.querySelector('.js-task-output');

//Add task: Get the input value when user presses 'Enter'
inputElement.addEventListener('keydown', () => {
  if(event.key === 'Enter') {
    list.push({taskName: inputElement.value, isComplete: false});
    saveToStorage();
    renderList();
    inputElement.value = '';
  }
});

addButtonElement.addEventListener('click', () => {
  list.push({taskName: inputElement.value, isComplete: false});
  saveToStorage();
  renderList();
  inputElement.value = '';
});

//render tasks on screen
function renderList() {
  //render list
  let generateHTML = '';
  list.forEach( (task, index) => {
    let cBtn = task.isComplete ? `<button class="is-complete-button js-complete-button" data-id="${index}">&#10003;</button>` : `<button class="js-complete-button" data-id="${index}">&#10003;</button>`;
    let dBtn = `<button class="js-delete-button" data-id="${index}">&#9003;</button>`;
    let eBtn = `<button class="js-edit-button js-specific-edit-button-${index}" data-id=${index}>&#9998;</button>`

    generateHTML += `
    <div class="task-container">
      <div class="task-name js-task-name-${index}">${task.taskName}</div>
      <div class="button-container">
        <div>${cBtn}</div>
        <div>${dBtn}</div>
        <div>${eBtn}</div>
      </div>
    </div>
    `;
  });
  outputElement.innerHTML = generateHTML;

  //delete task buttons
  const deleteButtons = document.querySelectorAll('.js-delete-button');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      deleteTask(button.dataset.id);
    });
  });

  //complete task button
  const completeButtons = document.querySelectorAll('.js-complete-button');
  completeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      completeTask(button.dataset.id);
    });
  });

  const editButtons = document.querySelectorAll('.js-edit-button');
  editButtons.forEach( (button) => {
    button.addEventListener('click', () => {
      editTask(button.dataset.id);
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

function completeTask(index) {
  if(list[index].isComplete === false) {
    list[index].isComplete = true;
  }
  else {
    list[index].isComplete = false;
  }
  //list[index].isComplete = !list[index].isComplete ? true : false; //ternary way 
  
  saveToStorage();
  renderList();
  console.log(list);
}

function editTask(index) {
  document.querySelector(`.js-specific-edit-button-${index}`).innerHTML = `<button class="change-button js-specific-edit-button-${index}">Cancel Edit</button>`;

  document.querySelector(`.js-task-name-${index}`).innerHTML = 
  `<input value="${list[index].taskName}" class="js-edit-task-name-${index}">
  <button class="change-button js-change-button" data-id=${index}>Change</button>`;

  const inputEditElement = document.querySelector(`.js-edit-task-name-${index}`);
  inputEditElement.addEventListener('keydown', () => {
    if(event.key === 'Enter') {
      list[index].taskName = inputEditElement.value;
      renderList();
      saveToStorage();
    }
  });

  const changeBtnElement = document.querySelectorAll('.js-change-button');
  changeBtnElement.forEach((button) => {
    button.addEventListener('click', () => {
      list[index].taskName = inputEditElement.value;
      renderList();
      saveToStorage();
    });
  });

  const cancelEditButton = document.querySelector(`.js-specific-edit-button-${index}`);
  cancelEditButton.addEventListener('click', () => {
    renderList();
  });

}

renderList(); //render list at runtime
console.log(list);  