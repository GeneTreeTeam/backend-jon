import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
var config = {
    apiKey: "AIzaSyD21K3KrD1JuuozRyyodo9x8vLA6H2DBKo",
    authDomain: "genetree-6417e.firebaseapp.com",
    databaseURL: "https://genetree-6417e.firebaseio.com",
    projectId: "genetree-6417e",
    storageBucket: "genetree-6417e.appspot.com",
    messagingSenderId: "937767112675"
};

firebase.initializeApp(config);


const auth = firebase.auth();
const db = firebase.database();
const store = firebase.firestore();
store.settings({ timestampsInSnapshots: true });

export {
  auth,
  db,
store,
    firebase
};


//export default firebase;

