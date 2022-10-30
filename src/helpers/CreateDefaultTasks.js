function CreateDefaultTasks() {

    const list = [];

    const task01 = ["Make dinner", "Lentil curry and coconut rice", "28-10-22", "high", "Personal"];
    const task02 = ["Go to shops", "Take a wee wander to shops and buy hings", "04-11-22", "medium", "Personal"];
    const task03 = ["Make a rota", "Double check staff holidays", "05-11-22", "low", "Work"];
    const task04 = ["Update labour", "Make sure we're not overspent", "28-10-22", "high", "Work"];
    const task05 = ["Clean cellar", "Delegate out to a staff member", "30-10-22", "medium", "Work"];


    list.push(task01);
    list.push(task02);
    list.push(task03);
    list.push(task04);
    list.push(task05);

    return list;
}

export default CreateDefaultTasks;