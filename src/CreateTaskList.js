import { EmptySection } from "./Helpers";

function CreateTaskList(list) {

    const container = document.querySelector(".taskContainer");
    const taskList = document.createElement("ul");
    taskList.classList.add("activeTaskList");

    EmptySection(container);

    for (const item of list.items) {
        const listItem = document.createElement("li");
        listItem.textContent = item.title;
        taskList.appendChild(listItem);
    }

    return taskList;
}

export default CreateTaskList;