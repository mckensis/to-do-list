import add from "date-fns/add";

function Title() {
    const label = document.createElement("label");
    const input = document.createElement("input");

    label.textContent = "Task Name";
    input.type = "text";
    input.name = "task-title";
    input.classList.add('add-task','title');
    input.required = true;
    
    input.minLength = '1';
    input.maxLength = "15";
    input.pattern = '^[a-zA-Z0-9-_ ]+';
    input.required = true;
    input.autocomplete = 'off';

    label.append(input);

    return label;
}

function Due() {
    const label = document.createElement("label");
    const input = document.createElement("input");

    //Minimum date is today
    //Maximum date is 100 years from today
    let minimumDate = new Date().toISOString().split("T")[0];
    let maximumDate = add(new Date(), { years: 100, }).toISOString().split('T')[0];
    
    label.textContent = "Due";
    input.type = "date";
    input.name = "task-due";
    input.classList.add('add-task','due');
    input.required = true;
    input.min = minimumDate;
    input.max = maximumDate;
    input.value = input.min;

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
    input.name = "task-priority";
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
    input.name = "task-list";
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
    button.name = "task-submit";
    button.classList.add('add-task','confirm');

    return button;
}

function Cancel() {
    const button = document.createElement("button");
    button.type = "cancel";
    button.textContent = "❌";
    button.name = "task-cancel";
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