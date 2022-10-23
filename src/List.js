import ToDo from "./ToDo";

class List {
    constructor(title) {
        this.title = title;
        this.items = [];
        this.active = false;
    }

    create(item) {
        const todo = new ToDo(item);
        this.add(todo);
    }

    add(todo) {
        this.items.push(todo);
    }
};

export default List;