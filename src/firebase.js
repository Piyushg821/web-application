import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDTj8BRIZVpmmrP0LpH8H-tXX-vItWVd1o',
  authDomain: 'react-crud-2ed88.firebaseapp.com',
  projectId: 'react-crud-2ed88',
  storageBucket: 'react-crud-2ed88.appspot.com',
  messagingSenderId: '680955765270',
  appId: '1:680955765270:web:ae4e068784cc92bef20b37',
  measurementId: 'G-72NHXH4HG3',
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const auth = getAuth()
export const db = getFirestore(app)
export const storage = getStorage(app)
