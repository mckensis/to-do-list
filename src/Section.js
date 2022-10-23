//Creates the bottom right section of the page,
//Where the active list will be displayed and can be interacted with.
//There is also a button that can create a new task.
function Section() {
    console.log("building active list section...");

    const container = document.createElement('section');
    const header = document.createElement('h2');
    const button = document.createElement('button');
    const div = document.createElement('div');
    
    container.classList.add("taskSection");
    button.classList.add("addTaskButton");
    div.classList.add('taskContainer');
    
    header.textContent = "tasks";
    button.textContent = "+";

    container.appendChild(header);
    container.appendChild(button);
    container.appendChild(div);

    return container;
}

export default Section;