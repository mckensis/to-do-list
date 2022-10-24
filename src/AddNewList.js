import { Hide, Show, SetHeight, SetListInputAttributes } from './Helpers.js';
import { CheckForBlankInput, TestForValidInput } from './Validate.js';
import List from './List.js';
import PopulateListSidebar from './PopulateListSidebar.js';

function AddNewList(lists) {
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
        //console.log("AddNewList.js - clicked submit button!");
        e.preventDefault();
        e.stopImmediatePropagation();

        if (!CheckForBlankInput(input)) {
            return;
        }

        if (!TestForValidInput(input)) {
            return;
        };
        
        Add(lists);
    
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

function Add(lists) {


    const name = document.querySelector("#list_name");
    const list = new List(name.value);
    
    lists.push(list);
    
    PopulateListSidebar(lists);
    
    //console.log("Add function, lists after PopulateListSidebar: ", lists);
    return lists;
    //need to get this list into "lists" array and then repopulate the list display aside
}

export default AddNewList;