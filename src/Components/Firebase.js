import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';

var config = {
    apiKey: "AIzaSyCF6KDsDpCucKRmsgHG2UgM7pHbfQO_A74",
    authDomain: "assistive-chess-robot.firebaseapp.com",
    databaseURL: "https://assistive-chess-robot.firebaseio.com",
    projectId: "assistive-chess-robot",
    storageBucket: "assistive-chess-robot.appspot.com",
    messagingSenderId: "400146311464"
};

firebase.initializeApp(config);

export let auth = firebase.auth;
export let ui = new firebaseui.auth.AuthUI(firebase.auth());

