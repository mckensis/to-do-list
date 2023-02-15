import ManageElementVisibility from "./ManageElementVisibility";

//Updates the select element with options for each list name
function UpdateOptionsList(select) {
    //Clear the options out so that there are no duplicates
    while (select.options.length > 0) {
        select.remove(0);
    }

    //For each list name, create an option item
    let listNames = Array.from(document.querySelector('.list-container').childNodes);
    listNames.forEach(list => {
        if (list.textContent === 'All Tasks') {
            return;
        }
        const option = new Option(list.textContent, list.textContent);
        select.add(option);
    });
}

function AddNewTaskForm() {
    const container = document.querySelector('.task-container');
    const form = document.querySelector('.add-task.form');
    const title = document.querySelector('.add-task.title');
    const due = document.querySelector(".add-task.due");
    const priority = document.querySelector(".add-task.priority");
    const select = document.querySelector('.add-task.list');
    const button = document.querySelector('.add-new.task');
    const submit = document.querySelector('.add-task.confirm');
    const cancel = document.querySelector('.add-task.cancel');

    const inputs = [
        title,
        due,
        priority,
        select,
    ];

    UpdateOptionsList(select);
    
    //Toggle the form and button when + is clicked
    ManageElementVisibility(container);
    
    title.value = '';    
    title.focus();
    
    select.addEventListener('click', UpdateOptionsList.bind(select, select));
    //submit.addEventListener("click", HandleSubmit.bind(submit, form, input, button));
    //cancel.addEventListener("click", HandleCancel.bind(cancel, form, input, button));
}

export default AddNewTaskForm;

/*
    const button = document.querySelector(".addTaskButton");
    const form = document.querySelector(".addTaskForm");
    const title = document.querySelector(".addTaskInput.title");
    const description = document.querySelector(".addTaskInput.description");
    const due = document.querySelector(".addTaskInput.due");
    const priority = document.querySelector(".addTaskInput.priority");
    const inputList = document.querySelector(".addTaskInput.list");

    const submit = document.querySelector(".addTaskConfirm");
    const cancel = document.querySelector(".addTaskCancel");

    const taskSection = document.querySelector(".taskSection");
    const taskContainer = document.querySelector(".taskContainer");

    const taskHeight = taskSection.offsetHeight;
    const height = taskContainer.offsetHeight;

    SetTaskTitleInputAttributes(title);
    UpdateTaskListOptions(inputList);

    Hide(button);
    Show(form);

    SetHeight(taskSection, taskHeight);
    SetHeight(taskContainer, "250");

    form.addEventListener("submit", (e) => {
        e.stopImmediatePropagation();
        e.preventDefault();

        const formData = new FormData(form);
        const data = [...formData.entries()];

        Add(data);
        //UpdateDefault(lists);

        Hide(form);
        Show(button);
        SetHeight(taskContainer, height);
    })

    submit.addEventListener("click", (e) => {
        e.stopImmediatePropagation();
        SetHeight(taskContainer, height);
        return;
    })

    cancel.addEventListener("click", (e) => {
        e.preventDefault();
        Hide(form);
        Show(button);
        SetHeight(taskContainer, height);
    });

    title.value = '';
    description.value = '';
    due.value = '';
    priority.option = "Default";

    title.focus();
}

}

export default AddNewTaskForm;
/*
function AddNewTask() {

    const button = document.querySelector(".addTaskButton");
    const form = document.querySelector(".addTaskForm");
    const title = document.querySelector(".addTaskInput.title");
    const description = document.querySelector(".addTaskInput.description");
    const due = document.querySelector(".addTaskInput.due");
    const priority = document.querySelector(".addTaskInput.priority");
    const inputList = document.querySelector(".addTaskInput.list");

    const submit = document.querySelector(".addTaskConfirm");
    const cancel = document.querySelector(".addTaskCancel");

    const taskSection = document.querySelector(".taskSection");
    const taskContainer = document.querySelector(".taskContainer");

    const taskHeight = taskSection.offsetHeight;
    const height = taskContainer.offsetHeight;

    SetTaskTitleInputAttributes(title);
    UpdateTaskListOptions(inputList);

    Hide(button);
    Show(form);

    SetHeight(taskSection, taskHeight);
    SetHeight(taskContainer, "250");

    form.addEventListener("submit", (e) => {
        e.stopImmediatePropagation();
        e.preventDefault();

        const formData = new FormData(form);
        const data = [...formData.entries()];

        Add(data);
        //UpdateDefault(lists);

        Hide(form);
        Show(button);
        SetHeight(taskContainer, height);
    })

    submit.addEventListener("click", (e) => {
        e.stopImmediatePropagation();
        SetHeight(taskContainer, height);
        return;
    })

    cancel.addEventListener("click", (e) => {
        e.preventDefault();
        Hide(form);
        Show(button);
        SetHeight(taskContainer, height);
    });

    title.value = '';
    description.value = '';
    due.value = '';
    priority.option = "Default";

    title.focus();
}

function Add(data) {

    const title = data[0][1];
    const due = data[1][1];
    const priority = data[2][1];
    const list = data[3][1];
    const description = data[4][1];

    const newTask = [];

    newTask.push(title, description, due, priority, list);
    console.log(newTask);

    const items = LoadLocalStorage();
    
    items.unshift(newTask);
    
    SaveLocalStorage(items);
    PopulateListSidebar();
    FilterTasks(list);
}
*/