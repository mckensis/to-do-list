import { format, formatISO, parseISO } from 'date-fns';
import {v4 as uuidv4} from 'uuid';

class Task {
    constructor(task) {
        this.owner = task.owner || null;
        this.title = task.title;
        this.dueDate = task.dueDate;
        this.priority = task.priority;
        this.complete = task.complete;
        this.index = null;
        this.overdue = task.overdue || false;
        this.id = task.id || uuidv4();
        this.list = task.list;
    }

    isComplete() {
        return this.complete ? true : false;
    }

    changePriority() {
        this.priority < 2 ? this.priority++ : this.priority = 0;
    }

    saveIndex(index) {
        this.index = index;
    }

    returnIndex() {
        return this.index;
    }

    toggleComplete() {
        this.complete = !this.complete;
    }
}

export default Task;