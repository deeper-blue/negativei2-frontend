import React, { Component } from 'react';
import './Header.scss';
import { auth } from '../Firebase';
import { Link } from 'react-router-dom';

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

    toggleNav = () => {
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
                    <Link to="/" id="home-link" className="link-blue">
                        HOME
                    </Link>
                    <nav id="dock">
                        <div id="dock-auth" className="dock-item" tooltip={this.state.user ? 'Logout' : 'Login'} tooltip-position="bottom">
                            <Link to={this.state.user ? '/logout' : '/login'}>
                                {this.state.user ?
                                <img src="/assets/header/logout.png" alt="Logout" id="dock-auth-icon"></img>
                                :
                                <img src="/assets/header/login.png" alt="Login" id="dock-auth-icon"></img>
                                }
                            </Link>
                        </div>
                        {this.state.user ?
                        <div id="dock-profile" className="dock-item" tooltip="Profile" tooltip-position="bottom">
                            <Link to="/profile">
                                <img src="/assets/header/profile.png" alt="Profile" id="dock-profile-icon"></img>
                            </Link>
                        </div>
                            : ''
                        }
                        <div id="dock-burger" className="dock-item" onClick={this.toggleNav}>
                            <div className="bar-1"></div>
                            <div className="bar-2"></div>
                            <div className="bar-3"></div>
                        </div>
                    </nav>
                </header>
                <div id="spacer"></div>
                <div id="page-hide" onClick={this.toggleNav}></div>
                <div id="navigator">
                    <p className="nav-title">Pages</p>
                    <Link to="/" className="link-yellow shadow">Home</Link>
                    <Link to="/create" className="link-yellow shadow">New game</Link>
                    <Link to="/join" className="link-yellow shadow">Join game</Link>
                    <hr />
                    <p className="nav-title">{this.state.user ? <span>{this.state.user.displayName}</span> : 'Guest'}</p>
                    <Link className="link-yellow shadow" to={this.state.user ? '/logout' : '/login'}>
                      {this.state.user ? 'Logout' : 'Login'}
                    </Link>
                    {this.state.user ? <Link className="link-yellow shadow" to="/profile">View profile</Link> : ''}
                </div>
            </div>
        );
    }
}

export default Header;