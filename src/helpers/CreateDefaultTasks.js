function CreateDefaultTasks() {

    const list = [];

    const task01 = ["Allow completion of tasks", "Add a button to mark a task as complete", "11-07-22", "medium", "Work"];
    const task02 = ["Allow deletion of tasks", "Add a delete button which removes the task from the list / localstorage", "11-04-22", "high", "Work"];
    const task03 = ["Finish implementing date-fns", "Implement date-fns to display dates better", "11-01-22", "high", "Work"];
    const task04 = ["Dress up the cat", "Dress up the cat as yer da'", "10-31-22", "low", "Personal"];
    const task05 = ["Make dinner", "Broccoli & tofu noodles", "10-30-22", "high", "Cooking"];
    const task06 = ["Go to shops", "Take a wee wander to shops and buy hings", "10-30-22", "high", "Shopping"];

    list.push(task01);
    list.push(task02);
    list.push(task03);
    list.push(task04);
    list.push(task05);
    list.push(task06);

    return list;
}

export default CreateDefaultTasks;