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

  list.forEach( (task) => {
    generateHTML += `<p>${task}</p>`
  });

  outputElement.innerHTML = generateHTML;
  console.log(list);  
}