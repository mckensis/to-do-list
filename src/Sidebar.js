function Form() {
    const newListForm = document.createElement("form");

    const inputField = document.createElement("input");
    const submitButton = document.createElement("button");
    const cancelButton = document.createElement("button");
    const label = document.createElement("label");

    submitButton.type = "submit";
    cancelButton.type = "cancel";
    
    inputField.classList.add("addListInput");
    submitButton.classList.add("addListConfirm");
    cancelButton.classList.add("addListCancel");
    newListForm.classList.add("addListForm","hidden");
    label.classList.add("addListLabel");

    inputField.name = "name";
    inputField.id = "list_name";
    inputField.type = "text";

    submitButton.textContent = "✓";
    cancelButton.textContent = "❌";
    label.textContent = "New List Name";
    
    newListForm.appendChild(label);
    newListForm.appendChild(inputField);
    newListForm.appendChild(submitButton);
    newListForm.appendChild(cancelButton);

    return newListForm;

}

//Creates the sidebar section of the page,
//Where all current lists will be displayed and can be interacted with.
//There is also a button that can create a new list
function Sidebar() {
    //console.log("building sidebar...")

    const container = document.createElement('aside');
    const header = document.createElement('h2');
    const button = document.createElement('button');
    const div = document.createElement('div');
    
    container.classList.add("listSection");
    button.classList.add("addListButton");
    div.classList.add("listContainer");
    
    header.textContent = "lists";
    button.textContent = "+";

    //moved to index.js to test for passing lists
    //button.addEventListener("click", AddNewList);
    
    container.appendChild(header);
    container.appendChild(Form());
    container.appendChild(button);
    container.appendChild(div);

    return container;
}

export default Sidebar;