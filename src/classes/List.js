import Task from "./Task";
import {v4 as uuidv4} from 'uuid';

class List {
    constructor(title, id) {
        this.title = title;
        this.tasks = [];
        this.id = id || uuidv4();
    }

    _store(item) {
        this.tasks.push(item);
    }

    create(item) {
        const task = new Task({
            title: item.title,
            dueDate: item.dueDate,
            priority: item.priority,
            complete: item.complete,
            overdue: item.overdue,
            id: item.id,
        });
        
        this._store(task);
    }
};

export default List;