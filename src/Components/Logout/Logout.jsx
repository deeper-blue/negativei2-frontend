import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { auth } from '../Firebase';

class Logout extends Component {
    render() {
        auth.signOut().then(function() {
            // Sign-out successful.
        }, function(error) {
            // An error happened.
            console.log(error);
        });
        return <Redirect to="/login" />;
    }
}

export default Logout;