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
        let year = item.dueDate.year;
        let month = String(Number(item.dueDate.month - 1));
        let day = item.dueDate.day;

        let date = format(new Date(year, month, day), 'yyyy-MM-dd');
        
        const task = new Task({
            title: item.title,
            dueDate: date,
            priority: item.priority,
            complete: item.complete,
            overdue: item.overdue,
            id: item.id,
        });        
        this._store(task);
    }
};

export default List;