import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyAzmTaaN2UhOiChunCz44CEDrAGV8_b1DY",
    authDomain: "whatsapp-clone-62092.firebaseapp.com",
    projectId: "whatsapp-clone-62092",
    storageBucket: "whatsapp-clone-62092.appspot.com",
    messagingSenderId: "90639402123",
    appId: "1:90639402123:web:cbaa9c43143693bed9008e",
    measurementId: "G-CBR13FJFHW"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
export {auth, googleProvider};
export default db;