import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

// Signs-in Friendly Chat.
export async function signIn() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  let provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

export async function signOutUser() {
  await signOut(getAuth());
}

// Initiate firebase auth
export function initFirebaseAuth() {
  // Listen to auth state changes.
  onAuthStateChanged(getAuth(), authStateObserver);
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
export function authStateObserver(user) {

  const signInButton = document.querySelector('header button.sign-in');
  const signOutButton = document.querySelector('header button.sign-out');

  if (user) {
    // User is signed in!
    // Get the signed-in user's profile pic and name.
    // var profilePicUrl = getProfilePicUrl();
    // var userName = getUserName();

    // Show user's profile and sign-out button.
    signOutButton.removeAttribute('hidden');
    // Hide sign-in button.
    signInButton.setAttribute('hidden', 'true');
  } else {
    // User is signed out!
    // Hide user's profile and sign-out button.
    signOutButton.setAttribute('hidden', 'true');
    // Show sign-in button.
    signInButton.removeAttribute('hidden');
  }
}