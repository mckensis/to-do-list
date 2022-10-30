import Task from "./Task";

class List {
    constructor(title) {
        this.title = title;
        this.items = [];
        this.raw = [];
    }

    create(item) {
        const task = new Task(item[0], item[1], item[2], item[3], item[4]);
        this.store(item);
        this.remove(item);
        this.add(task);
    }
    remove(item) {
        this.items.shift(item)
    }
    add(task) {
        this.items.push(task);
    }
    return()  {
        return this.raw;
    }
    store(item) {
        this.raw.push(item);
    }
    insert(task) {
        this.items.unshift(task);
    }
};

export default List;