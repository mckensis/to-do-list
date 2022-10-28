import List from './List.js';

function myListItems(myList) {

    myList.create("Make dinner", "Lentil curry and coconut rice", "28-10-22", "high");
    myList.create("Go to shops", "Take a wee wander to shops and buy hings", "today", "medium");

    return myList;
}

function workListItems(workList) {

    workList.create("Make a rota", "Double check staff holidays", "05-11-22", "low");
    workList.create("Update labour", "Make sure we're not overspent", "28-10-22", "high");
    workList.create("Clean cellar", "Delegate out to a staff member", "30-10-22", "medium");
}

function createListContainer() {
    
    const listContainer = [];
    
    return listContainer;
}

function createDefaultLists() {

    const defaultList = new List("All Tasks");
    const myList = new List("Personal");
    const workList = new List("Work");

    const listContainer = createListContainer();

    myListItems(myList);
    workListItems(workList);

    listContainer.push(defaultList);
    listContainer.push(workList);
    listContainer.push(myList);

    defaultList.active = true;

    return listContainer;
}

export default createDefaultLists;