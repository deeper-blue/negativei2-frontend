import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';
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
var ui = new firebaseui.auth.AuthUI(firebase.auth());

const rootElement = document.getElementById('root');

const app = (
    <BrowserRouter>
        <Route component={App} />
    </BrowserRouter>
);
ReactDOM.render(app, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
