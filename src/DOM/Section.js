import { UpdateTaskListOptions } from "../helpers/Helpers.js";

function Title() {

    const labelTitle = document.createElement("label");
    const inputTitle = document.createElement("input");

    labelTitle.textContent = "Task Name";
    inputTitle.type = "text";
    inputTitle.name = "Title";
    inputTitle.required = true;

    labelTitle.classList.add("addTaskLabel","title");
    inputTitle.classList.add("addTaskInput","title");

    labelTitle.appendChild(inputTitle);

    return labelTitle;
}

function Description() {

    const labelDescription = document.createElement("label");
    const inputDescription = document.createElement("input");

    labelDescription.textContent = "Description / Notes (optional)";
    inputDescription.type = "text";
    inputDescription.name = "Description";

    labelDescription.classList.add("addTaskLabel","description");
    inputDescription.classList.add("addTaskInput","description");

    labelDescription.appendChild(inputDescription);

    return labelDescription;
}

function Due() {

    const labelDue = document.createElement("label");
    const inputDue = document.createElement("input");

    labelDue.textContent = "Due";
    inputDue.type = "date";
    inputDue.name = "Due";
    inputDue.required = true;

    labelDue.classList.add("addTaskLabel","due");
    inputDue.classList.add("addTaskInput","due");

    labelDue.appendChild(inputDue);

    return labelDue;
}

function UrgentPriority() {

    const priority = document.createElement("option");

    priority.textContent = "Urgent";
    priority.value = "high";

    return priority;
}

function LowPriority() {

    const priority = document.createElement("option");

    priority.textContent = "Low";
    priority.value = "low";

    return priority;
}

function DefaultPriority() {
    const priority = document.createElement("option");

    priority.classList.add("defaultPriority");

    priority.textContent = "Default";
    priority.value = "medium";
    priority.selected = true;

    return priority;
}

function Priority() {
    
    const inputPriority = document.createElement("select");
    const labelPriority = document.createElement("label");

    labelPriority.textContent = "Priority";
    inputPriority.required = true;
    inputPriority.name = "Priority";

    labelPriority.classList.add("addTaskLabel","priority");
    inputPriority.classList.add("addTaskInput","priority");

    inputPriority.appendChild(UrgentPriority());
    inputPriority.appendChild(DefaultPriority());
    inputPriority.appendChild(LowPriority());

    labelPriority.appendChild(inputPriority);
    
    return labelPriority;
}

function TaskList() {

    const inputList = document.createElement("select");
    const labelList = document.createElement("label");

    labelList.textContent = "List";
    inputList.required = true;
    inputList.name = "List";
    labelList.classList.add("addTaskLabel","list");
    inputList.classList.add("addTaskInput","list");

    //This needs to be updated so that the list selector for a new task is built every time a new one is added.
    labelList.appendChild(UpdateTaskListOptions(inputList));
    
    return labelList;
}

function Submit() {
    const submitButton = document.createElement("button");
    
    submitButton.type = "submit";
    submitButton.textContent = "✓";
    submitButton.name = "Submit";
    submitButton.classList.add("addTaskConfirm");

    return submitButton;
}

function Cancel() {
    const cancelButton = document.createElement("button");
    
    cancelButton.type = "cancel";
    cancelButton.textContent = "❌";
    cancelButton.name = "Cancel";
    cancelButton.classList.add("addTaskCancel");

    return cancelButton;
}

function Form() {
    
    const newTaskForm = document.createElement("form");
    
    newTaskForm.classList.add("addTaskForm","hidden");
    
    newTaskForm.appendChild(Title());
    newTaskForm.appendChild(Due());
    newTaskForm.appendChild(Priority());
    newTaskForm.appendChild(TaskList());
    newTaskForm.appendChild(Description());
    
    newTaskForm.appendChild(Submit());
    newTaskForm.appendChild(Cancel());
    
    return newTaskForm;
}

//Creates the bottom right section of the page,
//Where the active list will be displayed and can be interacted with.
//There is also a button that can create a new task.
function Section() {

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