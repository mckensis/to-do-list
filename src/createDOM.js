//Creates the header section of the page
function createDOMHeader() {
    console.log("building header...")

    const title = document.createElement('h1');
    const header = document.createElement('header');

    header.classList.add('headerSection');

    title.textContent = "Do the thing!";
    
    header.appendChild(title);
    
    return header;
}

//Creates the sidebar section of the page,
//Where all current lists will be displayed and can be interacted with.
//There is also a button that can create a new list
function createDOMSidebar() {
    console.log("building sidebar...")

    const sidebar = document.createElement('aside');
    const header = document.createElement('h2');
    const button = document.createElement('button');
    const div = document.createElement('div');
    const list = document.createElement("ul");
    
    sidebar.classList.add("sidebar");
    button.classList.add("addListButton");
    div.classList.add("containerDiv");
    list.classList.add("sidebarList");
    
    header.textContent = "lists";
    button.textContent = "+";
    
    //const span = document.createElement('span');
    //span.textContent = "list";
    //button.appendChild(span);

    for (let i = 0; i < 20; i++) {
        const n = document.createElement("li");
        n.textContent = "list " + i;
        list.appendChild(n);
    }

    div.appendChild(list);

    sidebar.appendChild(header);
    sidebar.appendChild(button);
    sidebar.appendChild(div);

    return sidebar;
}

//Creates the bottom right section of the page,
//Where the active list will be displayed and can be interacted with.
//There is also a button that can create a new task.
function createDOMActiveListSection() {
    console.log("building active list section...");

    const display = document.createElement('section');
    const header = document.createElement('h2');
    const button = document.createElement('button');
    const div = document.createElement('div');
    const list = document.createElement("ul");
    
    display.classList.add("displaySection");
    button.classList.add("addTaskButton");
    div.classList.add('containerDiv');
    list.classList.add('activeTaskList');
    
    header.textContent = "tasks";
    button.textContent = "+";
    
    //const span = document.createElement('span');
    //span.textContent = "task";
    //button.appendChild(span);
    
    for (let i = 0; i < 20; i++) {
        const item = document.createElement("li");
        item.textContent = "test " + i;
        list.appendChild(item);
    }
    
    div.appendChild(list);

    display.appendChild(header);
    display.appendChild(button);
    display.appendChild(div);
    
    return display;
}

//Will be imported and called from index.js
//Creates all necessary DOM elements
function createDOM() {
    const page = document.querySelector('.mainPage');

    page.appendChild(createDOMHeader());
    page.appendChild(createDOMSidebar());
    page.appendChild(createDOMActiveListSection());

    return page;
}

export default createDOM;