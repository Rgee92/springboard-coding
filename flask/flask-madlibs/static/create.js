const addBtn = document.getElementById('add-prompt');
const form = document.getElementById('create-form');
let fieldCount = 1;

function addPrompt(e) {
    e.preventDefault();

    // Create a container div for each prompt
    const promptContainer = document.createElement('div');

    // Create input element
    const newField = document.createElement('input');
    newField.setAttribute('type', 'text');
    newField.setAttribute('name', `f-${fieldCount}`);
    newField.setAttribute('placeholder', 'noun, verb, adjective, etc.');

    // Create label element
    const newLabel = document.createElement('label');
    newLabel.setAttribute('for', `f-${fieldCount}`);
    newLabel.innerText = `Prompt ${fieldCount}: `;

    // Create line break element
    const br = document.createElement('br');

    // Append input and label to the container
    promptContainer.append(newLabel);
    promptContainer.append(newField);

    // Append the container and line break to the form
    form.append(promptContainer);
    form.append(br);

    fieldCount += 1;
}

addBtn.addEventListener('click', addPrompt);
