import firebase from 'firebase/app'
import 'firebase/auth'

if (!firebase.apps.length) {
  firebase.initializeApp({
    // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,

    apiKey: 'AIzaSyAPd3np2VK6Kk9S-hm7y8p7kBpMxCYts1Y',
    authDomain: 'admin-template-cc164.firebaseapp.com',
    projectId: 'admin-template-cc164'
  })
}

export default firebase
