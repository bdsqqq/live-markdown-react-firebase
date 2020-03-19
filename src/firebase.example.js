import firebase from 'firebase/app';
import 'firebase/database';
import { initializeApp } from 'firebase';

const config = {
    apiKey: "apiKey",
    authDomain: "authDomain",
    databaseURL: "databaseURL",
    projectId: "projectId",
    storageBucket: "storageBucket",
    messagingSenderId: "messagingSenderId",
    appId: "appId",
    measurementId: "measurementId"
};

firebase.initializeApp(config);
firebase.analytics();


export default firebase.database();