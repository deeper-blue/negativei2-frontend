import React, { Component } from 'react';
import './Header.scss';
import { auth } from '../Firebase';

class Header extends Component {
    navToggled = false;

    constructor(...args) {
        super(...args);

        this.state = {user: null}
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
            } else { // Guest

            }
        });
    }

    navIcon = () => {
        if (this.navToggled === false) {
            document.getElementById('dock-burger').classList.toggle('change');
            this.navToggled = true;
        } else {
            document.getElementById('dock-burger').classList.toggle('change');
            this.navToggled = false;
        }
        this.resizeNav(this.navToggled);
    }

    resizeNav = (bool) => {
        var pageHide = document.getElementById('page-hide');
        var navigator = document.getElementById('navigator');
        if (bool) {
            pageHide.classList.add('page-hide-reveal');
            navigator.classList.add('navigator-reveal');
        } else {
            pageHide.classList.remove('page-hide-reveal');
            navigator.classList.remove('navigator-reveal');
        }
    }

    render() {
        return (
            <div>
                <header id="header">
                    <a href="/" id="home-link" className="link-blue">
                        HOME
                    </a>
                    <nav id="dock">
                        <div id="dock-auth" className="dock-item" tooltip={this.state.user ? 'Logout' : 'Login'} tooltip-position="bottom">
                            <a href={this.state.user ? '/logout' : '/login'}>
                                {this.state.user ?
                                <img src="/assets/header/logout.png" alt="Logout" id="dock-auth-icon"></img>
                                :
                                <img src="/assets/header/login.png" alt="Login" id="dock-auth-icon"></img>
                                }
                            </a>
                        </div>
                        {this.state.user ?
                        <div id="dock-profile" className="dock-item" tooltip="Profile" tooltip-position="bottom">
                            <a href="/profile">
                                <img src="/assets/header/profile.png" alt="Profile" id="dock-profile-icon"></img>
                            </a>
                        </div>
                            : ''
                        }
                        <div id="dock-burger" className="dock-item" onClick={this.navIcon}>
                            <div className="bar-1"></div>
                            <div className="bar-2"></div>
                            <div className="bar-3"></div>
                        </div>
                    </nav>
                </header>
                <div id="spacer"></div>
                <div id="page-hide"></div>
                <div id="navigator">
                    <p className="nav-title">Pages</p>
                    <a href="/" className="link-yellow shadow">Home</a>
                    <a href="/create" className="link-yellow shadow">New game</a>
                    <a href="/join" className="link-yellow shadow">Join game</a>
                    <hr />
                    <p className="nav-title">{this.state.user ? <span>{this.state.user.displayName}</span> : 'Guest'}</p>
                    <a
                      className="link-yellow shadow"
                      href={this.state.user ? '/logout' : '/login'}>
                      {this.state.user ? 'Logout' : 'Login'}
                    </a>
                    {this.state.user ? <a className="link-yellow shadow" href="/profile">View profile</a> : ''}
                </div>
            </div>
        );
    }
}

export default Header;