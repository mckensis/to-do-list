function createDefaultLists() {
    
    const defaultList = {};
    const listArray = [];

    defaultList.title = "Default";
    defaultList.items = [];

    defaultList.items.push("Go to shops");
    defaultList.items.push("Take out the cat for a wee snacc");
    defaultList.items.push("Desto with the besto");
    defaultList.items.push("New freezer");

    defaultList.active = true;

    const workList = {};
    workList.title = "Work";
    workList.items = [];
    workList.active = false;

    listArray.push(defaultList);
    listArray.push(workList);

    return {listArray};
}

export default createDefaultLists;