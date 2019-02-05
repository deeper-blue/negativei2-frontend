import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { auth } from '../Firebase';

class Logout extends Component {
    constructor(...args) {
        super(...args);

        this.state = {user: null};
        this.initAuthListener = this.initAuthListener.bind(this);
    }

    componentDidMount() {
        this.initAuthListener();
    }

    initAuthListener() {
        var header = this;
        auth.onAuthStateChanged(function(user) {
            if (user) { // User
                header.setState({user: user});
            }
        });
    }

    redirect = (to) => {
        return <Redirect to={to} />
    }

    render() {
        if (this.state.user) { // Authenticated
            auth.signOut().then(function() {
                // Sign-out successful.
                return this.redirect('/login');
            }, function(error) {
                // An error happened.
                console.log(error);
                return this.redirect('/login');
            });
        } else { // Unauthenticated
            return this.redirect('/login');
        }
    }
}

export default Logout;