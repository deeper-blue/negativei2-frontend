import React from 'react';
import './Header.scss';
import PlayerStats from './PlayerStats';

function Header() {
    return (
    <div>
        <div className="header">
            <div className="profile-picture">
                <img src='/assets/profile.jpg' className='image' alt="logo" />
            </div>
            <div className='player-info'>
                <div>
                    PLAYER_NAME
                </div>
                <div className='stats'>
                    <PlayerStats />
                </div>
            </div>
        </div>
    </div>
    )
}

export default Header;