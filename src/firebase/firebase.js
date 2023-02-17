
import 'firebase/compat/firestore'
import 'firebase/compat/database'
import 'firebase/compat/storage'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDa6xKJ2vhm46_z6P4pPrnFqevHtwz38E8",
  authDomain: "mail-app-4ae78.firebaseapp.com",
  projectId: "mail-app-4ae78",
  storageBucket: "mail-app-4ae78.appspot.com",
  messagingSenderId: "423758353101",
  appId: "1:423758353101:web:42c9b259b8c4fd3be8cf84"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth, provider, db}