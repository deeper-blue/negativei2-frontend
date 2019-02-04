import React, { Component } from 'react';
import './Header.scss';

class Header extends Component {
    navToggled = false;

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
                    <a href="/" id="home-link">
                        HOME
                    </a>
                    <nav id="dock">
                        <div id="dock-auth" className="dock-item" tooltip="Login/Logout" tooltip-position="bottom">
                            <a href="/login">
                                <img src="/assets/header/auth.png" alt="Auth" id="dock-auth-icon"></img>
                            </a>
                        </div>
                        <div id="dock-profile" className="dock-item" tooltip="Profile" tooltip-position="bottom">
                            <a href="/profile">
                                <img src="/assets/header/profile.png" alt="Profile" id="dock-profile-icon"></img>
                            </a>
                        </div>
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
                    <a href="/">Home</a>
                    <a href="/create">New game</a>
                    <a href="/join">Join game</a>
                    <hr />
                    <p className="nav-title">User <span>abc123</span></p>
                    <a href="/login">Login</a>
                    <a href="/logout">Logout</a>
                    <a href="/profile">View profile</a>
                </div>
            </div>
        );
    }
}

export default Header;