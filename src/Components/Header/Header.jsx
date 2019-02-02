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
        //this.resizeNav(this.navToggled);
    }

    resizeNav = (bool) => {
        var nav = document.getElementById('page-links');
        if (bool) {
            nav.classList.add('reveal');
        } else {
            nav.classList.remove('reveal');
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
                        <div id="dock-auth" className="dock-item">
                            <a href="/login">
                                <img src="/assets/header/auth.png" alt="Auth" id="dock-auth-icon"></img>
                            </a>
                        </div>
                        <div id="dock-profile" className="dock-item">
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
                <div id="filler"></div>
            </div>
        );
    }
}

export default Header;