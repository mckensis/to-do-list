//Clears the tasks from the bottom right container in preparation to display the correct tasks
function EmptyContainer(container) {
    let length = 1;

    while (container.children.length > length) {
        container.removeChild(container.lastChild);
    }
    return container;
}

export default EmptyContainer;