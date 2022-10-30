import { Hide, Show, SetHeight, SetListInputAttributes, GetListNames, PopulateListSidebar, ShowAllTasks } from './helpers/Helpers.js';
import { CheckForBlankInput, TestForValidInput } from './helpers/Validate.js';

function AddNewList() {
    //console.log("AddNewList.js - clicked add new list...");
    const button = document.querySelector(".addListButton");
    const form = document.querySelector(".addListForm");
    const input = document.querySelector(".addListInput");
    const submit = document.querySelector(".addListConfirm");
    const cancel = document.querySelector(".addListCancel");

    const listSection = document.querySelector(".listSection");
    const height = listSection.offsetHeight;
    
    SetListInputAttributes(input);

    Hide(button);
    Show(form);

    SetHeight(listSection, height);

    submit.addEventListener("click", (e) => {

        e.preventDefault();
        e.stopImmediatePropagation();

        if (!CheckForBlankInput(input)) {
            return;
        }

        if (!TestForValidInput(input)) {
            return;
        };
        
        Add();
    
        Hide(form);
        Show(button);
    });

    cancel.addEventListener("click", (e) => {
        e.preventDefault();
        Hide(form);
        Show(button);
    });

    input.focus();
    //focus the field

}

function Add() {

    const name = document.querySelector("#list_name");
    const array = GetListNames();
    console.log(array);
    array.push(name.value);
    localStorage.setItem("array", JSON.stringify(array));

    console.log(array);
    
    PopulateListSidebar();
    ShowAllTasks();
    
    //console.log("Add function, lists after PopulateListSidebar: ", lists);
    //need to get this list into "lists" array and then repopulate the list display aside
}

export default AddNewList;