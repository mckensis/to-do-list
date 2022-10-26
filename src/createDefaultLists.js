import List from './List.js';
import ToDo from './ToDo.js'

function myListItems(myList) {

    const test = new ToDo("Bins", "Take bins to back garden and set them on fire", "tomorrow", "medium");

    myList.add(test);
    myList.add(new ToDo("Cooking", "Make a tasty dinner", "today", "high"));
    myList.add(new ToDo("Sit ups", "Do one million sit ups", "next year", "low"));
    myList.add(new ToDo("Go to shops", "Take a wee wander to shops and buy hings", "today", "high"));

    myList.add(new ToDo("Cooking", "Make a tasty dinner", "today", "high"));
    myList.add(new ToDo("Sit ups", "Do one million sit ups", "next year", "low"));
    myList.add(new ToDo("Go to shops", "Take a wee wander to shops and buy hings", "today", "high"));

    myList.add(new ToDo("Cooking", "Make a tasty dinner", "today", "high"));
    myList.add(new ToDo("Sit ups", "Do one million sit ups", "next year", "low"));
    myList.add(new ToDo("Go to shops", "Take a wee wander to shops and buy hings", "today", "high"));

    myList.create("test");

    return myList;
}

function defaultListItems(defaultList) {

    const test = new ToDo("Bins", "Take bins to back garden and set them on fire", "tomorrow", "high");

    defaultList.add(test);
    defaultList.add(new ToDo("Cooking", "Make a tasty dinner", "today", "medium"));
    defaultList.add(new ToDo("Sit ups", "Do one million sit ups", "next year", "low"));
    defaultList.add(new ToDo("Go to shops", "Take a wee wander to shops and buy hings", "today", "high"));
    defaultList.add(new ToDo("Cooking", "Make a tasty dinner", "today", "high"));
    defaultList.add(new ToDo("Sit ups", "Do one million sit ups", "next year", "low"));
    defaultList.add(new ToDo("Go to shops", "Take a wee wander to shops and buy hings", "today", "high"));
    defaultList.add(new ToDo("Cooking", "Make a tasty dinner", "today", "high"));
    defaultList.add(new ToDo("Sit ups", "Do one million sit ups", "next year", "low"));
    defaultList.add(new ToDo("Go to shops", "Take a wee wander to shops and buy hings", "today", "high"));

    return defaultList;
}

function workListItems(workList) {

    workList.create("Make a rota");
    workList.create("Update labour");
    workList.create("Clean cellar");
}

function createListContainer() {
    
    const listContainer = [];
    
    return listContainer;
}

function createDefaultLists() {

    const defaultList = new List("Default");
    const workList = new List("Work")
    const myList = new List("Aidan");

    const listContainer = createListContainer();

    defaultListItems(defaultList);
    workListItems(workList);
    myListItems(myList);

    listContainer.push(defaultList);
    listContainer.push(workList);
    listContainer.push(myList);

    defaultList.active = true;

    return listContainer;
}

export default createDefaultLists;