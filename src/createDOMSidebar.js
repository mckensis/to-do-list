function buildSidebar() {
    
    const sidebar = document.createElement('aside');
    const list = document.createElement("ul");
    const header = document.createElement('h2');
    const button = document.createElement('button');
    const div = document.createElement('div');

    sidebar.classList.add("sidebar");
    list.classList.add("sidebarList");
    button.classList.add("addListButton");
    div.classList.add("containerDiv");

    for (let i = 0; i < 50; i++) {
        const n = document.createElement("li");
        n.textContent = "list " + i;
        list.appendChild(n);
    }

    header.textContent = "Lists";
    button.textContent = "+";

    div.appendChild(list);

    sidebar.appendChild(header);
    sidebar.appendChild(button);
    sidebar.appendChild(div);

    console.log("building sidebar...")

    return sidebar;
}

export default buildSidebar;