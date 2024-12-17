//console.log("This is a popup!) //<-- this was used to show how to look at errors for popups
list = []

const inputElement = document.querySelector('.js-task-input');
const outputElement = document.querySelector('.js-task-output');


inputElement.addEventListener('keydown', event => {handleKeyDown(event)});

function handleKeyDown(event) {
  if(event.key === 'Enter')
    addTask();
}

function addTask() {
  //outputElement.innerHTML = inputElement.value;
  let output = "";
  list.push(inputElement.value)
  list.forEach( (value, index) => {
    output += `<p>${value} <button class="deleteBtn" data-index=${index})">Del</button> </p>`
    //<p>${value} <button id=${index}>Del</button> </p>
  } )

  //outputElement.innerHTML = output;
  inputElement.value = "";
  outputElement.innerHTML = output;
  const deleteButton = document.querySelector('.deleteBtn');
  deleteButton.addEventListener('click', (event) => {
  const indexToDelete = event.target.getAttribute('data-index');
  removeTask(indexToDelete); // Call function to remove the task
});
  
}

function removeTask(index) {
  console.log(index);
  list.splice(index, 1);
  console.log(list);

  outputElement.innerHTML = "";

  let output = "";
  list.forEach( (value, index) => {
    output += `<p>${value} <button class="deleteBtn" data-index=${index})">Del</button> </p>`
  } )

  //<p id=${index}>${value} <button onclick=" removeTask(${index})">Del</button> </p>
  outputElement.innerHTML = output;
}