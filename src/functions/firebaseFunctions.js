import {initializeApp } from 'firebase/app'
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig } from '../config/firebase';
const app=initializeApp(firebaseConfig);
export const auth=getAuth(app);

export const createrUser=(email,password,action,erroraction)=>{
    createUserWithEmailAndPassword(auth,email,password)
    .then(async (userCredential)=>{
        action();
    }).catch(error=>{
        console.log(error);
        erroraction()
    })
}

export const singInUser=(email,password,action,erroraction)=>{
    signInWithEmailAndPassword(auth,email,password)
    .then(async (userCredential)=>{
        action();
    }).catch(error=>{
        erroraction()
    })
}