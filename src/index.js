import './style.css';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import List from './classes/List';
import Task from './classes/Task';
import { AddNewListForm } from './functions/AddNewList';
import { DisplayLists, ToggleActiveList } from './functions/ListFunctions';
import { PopulateTasks } from './functions/TaskFunctions';
import { HandleCancel, HandleSubmit } from './functions/AddNewList';
import { v4 as uuid } from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyCXH5hvMo3mmNdxLskD6lrhiEe_JwS3mac",
  authDomain: "to-do-list-5cce5.firebaseapp.com",
  projectId: "to-do-list-5cce5",
  storageBucket: "to-do-list-5cce5.appspot.com",
  messagingSenderId: "491867481385",
  appId: "1:491867481385:web:289498864aa4ebccf30338",
  measurementId: "G-4F78PK05EP"
};

// Init firebase app
initializeApp(firebaseConfig);
  
// Firebase services init
const db = getFirestore();
const auth = getAuth();

// Collection ref
const listColRef = collection(db, "lists");
const taskColRef = collection(db, "tasks");

// Global variables
let tasks = [];
let lists = [];

// Page elements
const signInButton = document.querySelector('.user.sign-in');
const signOutButton = document.querySelector('.user.sign-out');
const expandListsButton = document.querySelector('button.expand');

const listContainer = document.querySelector('.list-container');
const addNewListForm = document.querySelector('form.add-list');
const addNewListFormButton = document.querySelector('button.add-new.list');
const submitNewListButton = document.querySelector('.add-list.confirm');
const cancelNewListButton = document.querySelector('.add-list.cancel');
const allTasksList = document.querySelector('.all-tasks-list');

const userNameElement = document.querySelector('header p.user-name');  
const userNameSpanElement = document.querySelector('header p.user-name span');
const userNamePhotoElement = document.querySelector('header img');


// Functions

// Returns the signed-in user's display name.
function getUserName() {
  if (!isUserSignedIn) return;
  return auth.currentUser.displayName;
}

// Sign out user
async function signOutUser() {
  await signOut(auth);
}

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
  if (!isUserSignedIn) return;
  return auth.currentUser.photoURL;
}

function getUserUid() {
  if (!isUserSignedIn) return;
  return auth.currentUser.uid;
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
  return !!getAuth().currentUser;
}

export function DisplayAllFirestoreTasks() {
  PopulateTasks(tasks);
}

export function DisplayFirestoreTasks(list) {
  const filteredTasks = tasks.filter(task => task.list === list.title);
  console.log(filteredTasks);
  PopulateTasks(filteredTasks);
}

export async function AddListToFirestore(value, owner) {
  const newestList = await addDoc(listColRef, {
    list_id: uuid(),
    list_name: value,
    owner_id: owner
  });
  console.log(newestList);
}

// Event Listeners

// Sign in user
signInButton.addEventListener('click', async () => {
  let provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
});

// Sign out user
signOutButton.addEventListener('click', async () => {
  await signOut(auth);
});

// Expand list section
expandListsButton.addEventListener('mouseover', () => {
  aside.style.borderBottomColor = 'var(--palette-color-secondary-hover-dark)';
});
expandListsButton.addEventListener('mouseleave', () => {
  aside.style.borderBottomColor = 'var(--palette-color-secondary)';
});
//List is undefined
// expandListsButton.addEventListener('click', ManageElementVisibility.bind(expandListsButton, list, 'expand / hide'));

// Display the new list form
addNewListFormButton.addEventListener('click', AddNewListForm);

// Submit the new list form
submitNewListButton.addEventListener("click", (e) => {
  e.preventDefault();
  HandleSubmit(listContainer, addNewListForm, auth.currentUser.uid);
});

cancelNewListButton.addEventListener("click", (e) => {
  e.preventDefault();
  HandleCancel(listContainer, addNewListForm);
});

allTasksList.addEventListener('click', () => {
  ToggleActiveList(allTasksList);
});

listContainer.addEventListener('click', (e) => {
  if (!e.target.dataset.id) return;

  // Get the id of the list item which was clicked on from the data-id property
  const id = e.target.dataset.id;

  if (id === 'all') {
    PopulateTasks(tasks);
    return;
  }

  console.log(e.target.dataset.id);
});

// Show all tasks
// allTasks.addEventListener('click', DisplayAllTasks.bind(list, allTasks));

// Watches for auth state change
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Update DOM elements
    userNameElement.removeAttribute('hidden');
    userNamePhotoElement.removeAttribute('hidden');
    signOutButton.removeAttribute('hidden');
    signInButton.setAttribute('hidden', 'true');
    userNameSpanElement.textContent = getUserName();
    userNamePhotoElement.src = getProfilePicUrl();
    
    // Get the user's lists from firestore
    const userListQuery = query(listColRef, where("owner_id", "==", auth.currentUser.uid));
    const userTaskQuery = query(taskColRef, where("owner_id", "==", auth.currentUser.uid));
    
    onSnapshot(userListQuery, (snapshot) => {
      snapshot.docs.forEach(doc => {
        let list = new List({title: doc.data().list_name, id: doc.data().list_id, owner: doc.data().owner_id})
        lists.push(list);
        DisplayLists(lists);
      });
    });

    onSnapshot(userTaskQuery, (snapshot) => {
      snapshot.docs.forEach(doc => {
        let data = {
          owner: doc.data().owner_id,
          title: doc.data().title,
          dueDate: doc.data().due_date,
          priority: doc.data().priority,
          complete: doc.data().complete || false,
          index: doc.data().index || null,
          overdue: doc.data().overdue,
          id: doc.data().id || uuid(),
          list: doc.data().list
        }
        let task = new Task(data);
        tasks.push(task);
        PopulateTasks(tasks);
      });
    });
  }

  if (!user) {
    // Update DOM elements
    signInButton.removeAttribute('hidden');
    signOutButton.setAttribute('hidden', 'true');
    userNameElement.setAttribute('hidden', true);
    userNamePhotoElement.setAttribute('hidden', true);
    userNameSpanElement.textContent = '';
    userNamePhotoElement.src = '';
  }
});