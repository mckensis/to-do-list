function Title() {

    const labelTitle = document.createElement("label");
    const inputTitle = document.createElement("input");

    labelTitle.textContent = "Task Name";
    inputTitle.type = "text";
    inputTitle.name = "title";
    inputTitle.id = "taskTitle";
    inputTitle.required = true;

    labelTitle.classList.add("addTaskLabel","title");
    inputTitle.classList.add("addNewTask","title");

    labelTitle.appendChild(inputTitle);

    return labelTitle;
}

function Description() {

    const labelDescription = document.createElement("label");
    const inputDescription = document.createElement("input");

    labelDescription.textContent = "Description / Notes (optional)";
    inputDescription.type = "text";
    inputDescription.name = "description"
    inputDescription.id = "taskDescription";

    labelDescription.classList.add("addTaskLabel","description");
    inputDescription.classList.add("addNewTask","description");

    labelDescription.appendChild(inputDescription);

    return labelDescription;
}

function Due() {

    const labelDue = document.createElement("label");
    const inputDue = document.createElement("input");

    labelDue.textContent = "Due";
    inputDue.type = "date";
    inputDue.name = "due";
    inputDue.id = "taskDue";
    inputDue.required = true;

    labelDue.classList.add("addTaskLabel","due");
    inputDue.classList.add("addNewTask","due");

    labelDue.appendChild(inputDue);

    return labelDue;

}

function DefaultPriority() {
    const priority = document.createElement("input");
    const label = document.createElement("label");

    priority.type = "radio";
    priority.name = "priority";
    priority.id = "medium";
    priority.checked = true;
    priority.value = "medium";

    label.id = "medium";
    label.textContent = "Medium";

    priority.classList.add("defaultPriority");

    label.appendChild(priority);

    return label;
}

function UrgentPriority() {
    const priority = document.createElement("input");
    const label = document.createElement("label");

    priority.type = "radio";
    priority.name = "priority";
    priority.id = "high";
    priority.value = "high";

    label.id = "high";
    label.textContent = "High";

    priority.classList.add("highPriority");

    label.appendChild(priority);

    return label;
}

function LowPriority() {

    const priority = document.createElement("input");
    const label = document.createElement("label");

    label.textContent = "Low";

    priority.type = "radio";
    priority.name = "priority";
    priority.id = "low";
    priority.value = "low";

    label.id = "low";
    label.textContent = "Low";

    priority.classList.add("lowPriority");

    label.appendChild(priority);

    return label;
}

function Priority() {

    const inputPriority = document.createElement("radiogroup");
    const labelPriority = document.createElement("label");

    labelPriority.textContent = "Priority";
    inputPriority.required = "true";
    
    labelPriority.classList.add("addTaskLabel","priority");
    inputPriority.classList.add("addNewTask","priority");

    inputPriority.appendChild(UrgentPriority());
    inputPriority.appendChild(DefaultPriority());
    inputPriority.appendChild(LowPriority());

    labelPriority.appendChild(inputPriority);

    return labelPriority;
}

function Submit() {
    const submitButton = document.createElement("button");
    
    submitButton.type = "submit";
    submitButton.textContent = "✓";
    submitButton.classList.add("addTaskConfirm");

    return submitButton;
}

function Cancel() {
    const cancelButton = document.createElement("button");
    
    cancelButton.type = "cancel";
    cancelButton.textContent = "❌";
    cancelButton.classList.add("addTaskCancel");

    return cancelButton;
}

function Form() {
    
    const newTaskForm = document.createElement("form");
    
    newTaskForm.id = "addTaskForm";
    newTaskForm.classList.add("addTaskForm","hidden");
    
    newTaskForm.appendChild(Title());
    newTaskForm.appendChild(Due());
    newTaskForm.appendChild(Priority());
    newTaskForm.appendChild(Submit());
    
    newTaskForm.appendChild(Description());
    newTaskForm.appendChild(Cancel());
    

    return newTaskForm;
}

//Creates the bottom right section of the page,
//Where the active list will be displayed and can be interacted with.
//There is also a button that can create a new task.
function Section() {
    //console.log("building active list section...");

    const container = document.createElement('section');
    const header = document.createElement('h2');
    const button = document.createElement('button');
    const div = document.createElement('div');
    
    container.classList.add("taskSection");
    button.classList.add("addTaskButton");
    div.classList.add('taskContainer');
    
    header.textContent = "tasks";
    button.textContent = "+";

    container.appendChild(header);
    container.appendChild(button);
    container.appendChild(Form())
    container.appendChild(div);

    return container;
}

export default Section;