import firebase from "firebase/compat";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9K62SMvQX1hcww_6NWYQgj03MenpzokI",
  authDomain: "prac-d11bc.firebaseapp.com",
  projectId: "prac-d11bc",
  storageBucket: "prac-d11bc.appspot.com",
  messagingSenderId: "470083960474",
  appId: "1:470083960474:web:8167ef1221f1dd0921a923",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
