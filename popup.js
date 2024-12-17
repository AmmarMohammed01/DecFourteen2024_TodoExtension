let list = JSON.parse( localStorage.getItem('todo-extension-list') );

if(!list) {
  list = [];
  //list = [{taskName: "name", isComplete: true}];
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
    list.push({taskName: inputElement.value, isComplete: false});
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
    let cBtn = task.isComplete ? `<button class="is-complete-button js-complete-button" data-id="${index}">C</button>` : `<button class="complete-button js-complete-button" data-id="${index}">C</button>`;

    generateHTML += `
    <div>${task.taskName}
      ${cBtn}
      <button class="js-delete-button" data-id="${index}">D</button> 
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

renderList(); //render list at runtime
console.log(list);  