function Title() {
    const label = document.createElement("label");
    const input = document.createElement("input");

    label.textContent = "Task Name";
    input.type = "text";
    input.name = "Title";
    input.classList.add('add-task','title');
    input.required = true;

    label.append(input);

    return label;
}

function Description() {
    const label = document.createElement("label");
    const input = document.createElement("input");

    label.textContent = "Description / Notes (optional)";
    input.type = "text";
    input.name = "Description";
    input.classList.add('add-task','description');

    label.append(input);

    return label;
}

function Due() {
    const label = document.createElement("label");
    const input = document.createElement("input");

    label.textContent = "Due";
    input.type = "date";
    input.name = "Due";
    input.classList.add('add-task','due');
    input.required = true;

    label.append(input);

    return label;
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
    priority.textContent = "Default";
    priority.value = "medium";
    priority.selected = true;
    return priority;
}

function Priority() {
    const input = document.createElement("select");
    const label = document.createElement("label");

    label.textContent = "Priority";
    input.name = "Priority";
    input.classList.add('add-task','priority');
    input.required = true;

    input.append(UrgentPriority(), DefaultPriority(), LowPriority());
    label.append(input);
    
    return label;
}

function TaskList() {
    const input = document.createElement("select");
    const label = document.createElement("label");

    label.textContent = "List";
    input.name = "List";
    input.classList.add('add-task','list');
    input.required = true;

    label.append(input);
    //This needs to be updated so that the list selector for a new task is built every time a new one is added.
    //Get the names of the lists
    //to create options on the form
    //to add a new task to the list
    //label.append(UpdateTaskListOptions(input));
    
    return label;
}

function Submit() {
    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "✓";
    button.name = "Submit";
    button.classList.add('add-task','confirm');

    return button;
}

function Cancel() {
    const button = document.createElement("button");
    button.type = "cancel";
    button.textContent = "❌";
    button.name = "Cancel";
    button.classList.add('add-task','cancel');

    return button;
}

function NewTaskForm() {
    const form = document.createElement("form");
    form.classList.add('add-task','form','hidden');

    let title = Title();
    let due = Due();
    let priority = Priority();
    let list = TaskList();
    let submit = Submit();
    let cancel = Cancel();
    
    form.append(title, due, priority, list, submit, cancel);

    return form;
}

export default NewTaskForm;