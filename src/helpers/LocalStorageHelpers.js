function SaveLocalStorage(items) {

    localStorage.setItem("items", JSON.stringify(items));
}

function LoadLocalStorage() {

    let items = JSON.parse(localStorage.getItem("items"));

    return items;
}

function CheckLocalStorage() {

    if (localStorage.getItem("items")) {
        return true;
    }

    return false;
}

export { SaveLocalStorage, LoadLocalStorage, CheckLocalStorage };