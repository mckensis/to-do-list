import {v4 as uuidv4} from 'uuid';

class Task {
    constructor(task) {
        this.title = task.title;
        this.due = ({ day: task.due.day, month: task.due.month -1, year: task.due.year });
        this.priority = task.priority;
        this.complete = task.complete || false;
        this.index = null;
        this.id = task.id || uuidv4();
    }

    isComplete() {
        return this.complete;
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