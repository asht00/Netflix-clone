// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDZqDcdqWos1_et65uv3kcGWpk567lDDWc",
    authDomain: "netflix-clone-ec462.firebaseapp.com",
    projectId: "netflix-clone-ec462",
    storageBucket: "netflix-clone-ec462.appspot.com",
    messagingSenderId: "1056503770648",
    appId: "1:1056503770648:web:6845ba2ed3c70cad31dd6d",
    measurementId: "G-QG3HYN3T0V"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;

