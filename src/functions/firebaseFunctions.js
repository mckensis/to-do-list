import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
  getDoc,
  getDocs,
} from 'firebase/firestore';

// Signs-in Friendly Chat.
export async function signIn() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  let provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
  await saveUser();
}

export async function signOutUser() {
  await signOut(getAuth());
}

// Initiate firebase auth
export function initFirebaseAuth() {
  // Listen to auth state changes.
  onAuthStateChanged(getAuth(), authStateObserver);
}

// Returns the signed-in user's profile Pic URL.
export function getProfilePicUrl() {
  return getAuth().currentUser.photoURL;
}

// Returns the signed-in user's display name.
export function getUserName() {
  return getAuth().currentUser.displayName;
}

export function getUserUid() {
  return getAuth().currentUser.uid;
}

// Returns true if a user is signed-in.
export function isUserSignedIn() {
  return !!getAuth().currentUser;
}

export function getUserListsFromFirestore() {
  if (!isUserSignedIn) return;
  const lists = query(collection(getFirestore(), 'lists'), )
}

export async function saveUser() {
  const db = getFirestore();
  const userRef = doc(db, 'users', getUserUid());
  let snapshot;

  try {
    snapshot = await getDoc(userRef);
  } catch (error) {
    console.error("Error retrieving user from Firestore.", error);
  }

  // Check if the user already exists in the store.
  if (snapshot.exists()) return;

  try {
    await setDoc(userRef);
    await setDoc(userRef, collection("lists"));
  } catch (error) {
    console.error('Error saving user to Firestore.', error);
  }
}

// Saves a new message to Cloud Firestore.
export async function saveList(list) {
  const db = getFirestore();
  const data = {
    list_id: list.id,
    list_name: list.title,
  };
  try {
    const userCollection = await getDoc(doc(db, "users", getUserUid()));
    console.log(userCollection);
  }
  catch(error) {
    console.error('Error writing new message to Firebase Database', error);
  }
}


// Triggers when the auth state change for instance when the user signs-in or signs-out.
export function authStateObserver(user) {
  const signInButton = document.querySelector('header button.sign-in');
  const signOutButton = document.querySelector('header button.sign-out');
  const userNameElement = document.querySelector('header p.user-name');  
  const userNameSpanElement = document.querySelector('header p.user-name span');
  const userNamePhotoElement = document.querySelector('header img');

  if (user) {
    // User is signed in!
    // Get the signed-in user's profile pic and name.
    const userName = getUserName();
    const photoUrl = getProfilePicUrl();

    // Show user's profile and sign-out button.
    signOutButton.removeAttribute('hidden');

    // Hide sign-in button.
    signInButton.setAttribute('hidden', 'true');

    // Display the user's name on the page
    userNameElement.removeAttribute('hidden');
    userNameSpanElement.textContent = userName;

    // Show the user's photo
    userNamePhotoElement.removeAttribute('hidden');
    userNamePhotoElement.src = photoUrl;
  } else {
    // User is signed out!
    // Hide user's profile and sign-out button.
    signOutButton.setAttribute('hidden', 'true');
    // Show sign-in button.
    signInButton.removeAttribute('hidden');

    // Hide user name and clear their name from the span element.
    userNameElement.setAttribute('hidden', true);
    userNameSpanElement.textContent = '';
    
    // Hide user photo and clear the src of the element.
    userNamePhotoElement.setAttribute('hidden', true);
    userNamePhotoElement.src = '';
  }
}