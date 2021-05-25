import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBq1j1ebkdyQqaI6-nSeGSOT7uvKVBflvE",
    authDomain: "weskillztask.firebaseapp.com",
    projectId: "weskillztask",
    storageBucket: "weskillztask.appspot.com",
    messagingSenderId: "594622817813",
    appId: "1:594622817813:web:95a0dc0ecd942226a3101c",
    measurementId: "G-VGY5CE1ZB5"
})

const db = firebaseApp.firestore()
const rdb = firebaseApp.database()
const auth = firebaseApp.auth()
const storage = firebaseApp.storage().ref();

export { db, rdb, auth, storage }