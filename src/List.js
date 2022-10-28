import Task from "./Task.js";

class List {
    constructor(title) {
        this.title = title;
        this.items = [];
        this.active = false;
    }

    add(task) {
        this.items.unshift(task);
    }

    create(title, description, dueDate, priority) {
        const task = new Task(title, description, dueDate, priority);
        this.add(task);
    }

};

export default List;