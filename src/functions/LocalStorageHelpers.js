import List from "../classes/List";

//Convert localstorage JSON back into tasks and lists
function ConvertJSONIntoObjects(json) {
    let array = [];

    //Create each list
    json.forEach(list => {
        let newList = new List(list.title, list.id);
        //Create each task for the lists
        list.tasks.forEach(task => {
            newList.create({ 
                title: task.title,
                due: task.due,
                complete: task.complete,
                priority: task.priority,
                id: task.id,
                });
        });
        array.push(newList);
    });
    return array;
}

function UpdateLocalStorage(updatedTask, type) {
    const data = LoadLocalStorage();
    
    data.forEach(list => {
        list.tasks.forEach(task => {
            if (task.id === updatedTask.id) {
                if (type === 'completion') {
                    task.toggleComplete();
                    return;
                }
                if (type === 'priority') {
                    task.changePriority();
                    return;
                }
            }
        });
    });
    SaveLocalStorage(data);
}

function SaveLocalStorage(list) {
    localStorage.setItem('tasks', JSON.stringify(list));
}

function LoadLocalStorage() {
    let items = JSON.parse(localStorage.getItem('tasks'));
    let array = ConvertJSONIntoObjects(items);
    return array;
}

function CheckLocalStorage() {
    if (localStorage.getItem('tasks')) {
        return true;
    }
    return false;
}

function GetListFromLocalStorage() {
    if (!CheckLocalStorage()) {
        return false;
    } else {
        return LoadLocalStorage();
    }
}

export { SaveLocalStorage,
         LoadLocalStorage,
         CheckLocalStorage,
         GetListFromLocalStorage,
         UpdateLocalStorage,
};