import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.scss';

function Menu (props) {

    return (
        <div className="menu">
            <div>
                <img src='/assets/logo.svg' className="App-logo" alt="logo" />
            </div>
            <div>
                <div id="playGame"><Link to='/Profile'>Play GAME!</Link></div>
                <div id="profile"><Link to='/Profile'>Profile</Link></div>
            </div>
        </div>
    )
}

export default Menu;