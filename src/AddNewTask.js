import { Hide, Show, SetHeight, SetTaskTitleInputAttributes, SetTaskDescriptionInputAttributes, SetTaskDueInputAttributes, ReturnActiveList, UpdateDefaultList, EmptySection } from './Helpers.js';
import { CheckForBlankInput, TestForValidInput } from './Validate.js';
import PopulateTaskSection from './PopulateTaskSection';

function AddNewTask(lists) {

    const button = document.querySelector(".addTaskButton");
    const form = document.querySelector(".addTaskForm");
    const title = document.querySelector(".addTaskInput.title");
    const description = document.querySelector(".addTaskInput.description");
    const due = document.querySelector(".addTaskInput.due");
    const priority = document.querySelector(".addTaskInput.priority");
    const list = document.querySelector(".addTaskInput.list");

    const submit = document.querySelector(".addTaskConfirm");
    const cancel = document.querySelector(".addTaskCancel");

    const taskSection = document.querySelector(".taskSection");
    const taskContainer = document.querySelector(".taskContainer");
    const taskHeight = taskSection.offsetHeight;
    const height = taskContainer.offsetHeight;

    SetTaskTitleInputAttributes(title);

    Hide(button);
    Show(form);

    SetHeight(taskSection, taskHeight);
    SetHeight(taskContainer, "310");

    form.addEventListener("submit", (e) => {
        e.stopImmediatePropagation();
        e.preventDefault();

        const activeList = ReturnActiveList(lists);

        const formData = new FormData(form);
        const data = [...formData.entries()];

        Add(activeList, data);
        UpdateDefault(lists);

        Hide(form);
        Show(button);
    })

    submit.addEventListener("click", (e) => {
        e.stopImmediatePropagation();
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

function Populate(list, lists) {
    console.log(list);
    for (const l of lists) {
        if (l.title !== "All Tasks") {
            for (const item of l.items) {
                console.log(item);
                list.add(item);
            }
        }
    }
}

function Empty(list) {
    while (list.items.length > 0) {
        list.items.pop();
    }
}

function UpdateDefault(lists) {
    for (const list of lists) {
        if (list.title == "All Tasks") {
            Empty(list);
            Populate(list, lists);
        }
    }
}

function Add(activeList, data) {

    const title = data[0][1];
    const due = data[1][1];
    const priority = data[2][1];
    const description = data[3][1];

    activeList.create(title, description, due, priority);

    PopulateTaskSection(activeList);
    
    return activeList;
}

export default AddNewTask;