import firebase from 'firebase/app';
import 'firebase/database';
import { initializeApp } from 'firebase';

const config = {
    apiKey: "AIzaSyDM2tXbOW7wU_WejbCGoIVL_N_e8SfXHsE",
    authDomain: "markdown-55ecf.firebaseapp.com",
    databaseURL: "https://markdown-55ecf.firebaseio.com",
    projectId: "markdown-55ecf",
    storageBucket: "markdown-55ecf.appspot.com",
    messagingSenderId: "70094701989",
    appId: "1:70094701989:web:e528c09353553d8e0d544c",
    measurementId: "G-QXWF562J96"
};

firebase.initializeApp(config);
firebase.analytics();


export default firebase.database();