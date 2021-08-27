import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyDvPUAkc8nvLJ03xX0qrnfM6K-0OX02BFk",
    authDomain: "conexio-landing-page.firebaseapp.com",
    databaseURL: "https://conexio-landing-page-default-rtdb.firebaseio.com",
    projectId: "conexio-landing-page",
    storageBucket: "conexio-landing-page.appspot.com",
    messagingSenderId: "1539014689",
    appId: "1:1539014689:web:27579df7e0e70ae35b6360",
    measurementId: "G-EDKXDY0VD0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase