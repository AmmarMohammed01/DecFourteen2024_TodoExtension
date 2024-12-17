let list = [];

//Grab input and output elements
const inputElement = document.querySelector('.js-task-input');
const outputElement = document.querySelector('.js-task-output');

//Test to see if correct element is grabbed
console.log(inputElement);
console.log(outputElement);

//Get the input value when user presses 'Enter'
inputElement.addEventListener('keydown', () => {
  if(event.key === 'Enter') {
    list.push(inputElement.value);
    renderList();
    inputElement.value = '';
  }
});

//render tasks on screen
function renderList() {
  let generateHTML = '';

  list.forEach( (task, index) => {
    generateHTML += `<div>${task} <button class="js-delete-button" data-id="${index}">Delete</button> </div>`
  });

  outputElement.innerHTML = generateHTML;

  const deleteButton = document.querySelectorAll('.js-delete-button'); //this is an array of all button elements, each element must be accessed individually
  // console.log(JSON.stringify(deleteButton));
  // console.log(deleteButton);
  console.log(list);
  
  deleteButton.forEach((button) => {
    button.addEventListener('click', () => {
      deleteTask(button.dataset.id);
    });
  });
}

//Deletes a task from list and renders updated list.
function deleteTask(index) {
  let deleted = list.splice(index, 1);
  console.log(`Deleted: ${deleted}`);
  renderList();
  
}