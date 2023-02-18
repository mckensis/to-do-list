import Task from "./Task";
import format from "date-fns/format";
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
        
        let taskDate = format(new Date(item.dueDate.year, item.dueDate.month, item.dueDate.day), 'yyyy-MM-dd');

        const task = new Task({
            title: item.title,
            dueDate: taskDate,
            priority: item.priority,
            complete: item.complete,
            overdue: item.overdue,
            id: item.id,
        });        
        this._store(task);
    }
};

export default List;