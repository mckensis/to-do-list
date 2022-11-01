import Task from "./Task";

class List {
    constructor(title) {
        this.title = title;
        this.items = [];
        this.tasks = [];
    }

    _store(item) {
        this.tasks.push(item);
    }

    create(item) {
        const task = new Task(item[0], item[1], item[2], item[3], item[4]);
        this._store(task);
    }

    returnItemsArray()  {
        return this.items;
    }
};

export default List;