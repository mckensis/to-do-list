import './style.css';
import CreateWebpage from './components/Webpage';
import { DisplayLists } from './functions/ListFunctions';
import { DisplayAllTasks } from './functions/TaskFunctions';
import CreateDefaultList from './functions/CreateDefaultList';
import { GetListFromLocalStorage, SaveLocalStorage } from './functions/LocalStorageHelpers';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getUserListsFromFirestore, initFirebaseAuth } from './functions/firebaseFunctions';

const firebaseConfig = {
  apiKey: "AIzaSyCXH5hvMo3mmNdxLskD6lrhiEe_JwS3mac",
  authDomain: "to-do-list-5cce5.firebaseapp.com",
  projectId: "to-do-list-5cce5",
  storageBucket: "to-do-list-5cce5.appspot.com",
  messagingSenderId: "491867481385",
  appId: "1:491867481385:web:289498864aa4ebccf30338",
  measurementId: "G-4F78PK05EP"
};

// import data from './data.json';
window.addEventListener('load', setUpPage);

function setUpPage() {
    // Create the DOM Layout (title, lists & tasks sections);
    CreateWebpage();

    //Get the tasks from local storage
    let list = GetListFromLocalStorage();
    // let list = getUserListsFromFirestore();
    
    //If they don't exist, then create the default lists & tasks
    if (!list) {
        //Save the list that was just created 
        list = CreateDefaultList();
        SaveLocalStorage(list);
    }

    //Display lists and all tasks
    DisplayLists(list);
    DisplayAllTasks();

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    initFirebaseAuth();
}