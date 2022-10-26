import { Hide, Show, SetHeight, SetTaskTitleInputAttributes } from './Helpers.js';
import { CheckForBlankInput, TestForValidInput } from './Validate.js';
import List from './List.js';
import ToDo from './ToDo.js';
import PopulateTaskSection from './PopulateTaskSection';
import PopulateListSidebar from './PopulateListSidebar.js'; 

function AddNewTask(lists) {

    console.log(lists);

    const button = document.querySelector(".addTaskButton");
    const form = document.querySelector(".addTaskForm");
    const title = document.querySelector(".addNewTask.title");
    const description = document.querySelector(".addNewTask.description");
    const due = document.querySelector(".addNewTask.due");
    const priority = document.querySelector(".addNewTask.priority");

    const submit = document.querySelector(".addTaskConfirm");
    const cancel = document.querySelector(".addTaskCancel");

    const taskSection = document.querySelector(".taskSection");
    const taskContainer = document.querySelector(".taskContainer");
    const height = taskSection.offsetHeight;
    
    SetTaskTitleInputAttributes(title);

    // this is to be programmed in to be better
    taskContainer.classList.add("hidden");

    Hide(button);
    Show(form);

    SetHeight(taskSection, height);

    title.focus();

}

function Add(lists) {

    const name = document.querySelector("#list_name");
    const list = new List(name.value);
    
    lists.push(list);
    
    PopulateListSidebar(lists);
    
    //console.log("Add function, lists after PopulateListSidebar: ", lists);
    return lists;
    //need to get this list into "lists" array and then repopulate the list display aside
}

export default AddNewTask;