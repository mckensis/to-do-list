function buildDisplay() {
    const display = document.createElement('section');
    display.classList.add("displaySection");
    console.log("building display...")

    const div = document.createElement('div');
    div.classList.add('containerDiv');
    /*this is to test the scrollbar styling*/
    
    const list = document.createElement("ul");
    for (let i = 0; i < 50; i++) {
        const item = document.createElement("li");
        item.textContent = "test" + i;
        list.appendChild(item);
    }

    div.appendChild(list);
    display.appendChild(div);
    
    return display;
}

export default buildDisplay;