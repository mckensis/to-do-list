import { Hide, Show } from './Helpers.js';
import List from './List.js';

function testInput(e) {
    if ((e.keyCode > 64 && e.keyCode < 91) || (e.keyCode > 96 && e.keyCode < 123)) {
        return true;
    }
    return false;
}

function AddNewList() {
    console.log("clicked add new list...");
    const button = document.querySelector(".addListButton");
    const form = document.querySelector(".addListForm");
    const input = document.querySelector(".addListInput");
    const submit = document.querySelector(".addListConfirm");
    const cancel = document.querySelector(".addListCancel");
    const listSection = document.querySelector(".listSection");
    const listSectionHeight = listSection.offsetHeight;
    
    Hide(button);
    Show(form);
 
    listSection.setAttribute("style",`height:${listSectionHeight}px`);

    submit.addEventListener("click", (e) => {
        e.preventDefault();
        testInput(e);

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

    if (!name.value) {
        const inputField = document.querySelector(".addNewList");
        inputField.focus();
        return;
    }

    console.log("new list name: " + name.value);
    const list = new List(name.value);
    console.log(list);

    //need to get this list into "lists" array and then repopulate the list display aside
}

export default AddNewList;