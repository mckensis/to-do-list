//Clears the tasks from the bottom right container in preparation to display the correct tasks
function EmptyContainer(container) {
    let length = 0;
    
    //Do not remove the 'All Tasks' option
    if (container.classList.contains('list-container')) {
        length = 1;
    }

    while (container.childNodes.length > length) {
        container.removeChild(container.lastChild);
    }
    return container;
}

export default EmptyContainer;