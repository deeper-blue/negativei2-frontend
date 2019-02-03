import React from 'react';
import './Header.scss';

function Header() {
    return (
    <div>
        <div className="header">
            <div className="profile-picture">
                <img src='/assets/logo.svg' className='image' alt="logo" />
            </div>
            <div className='player-info'>
                <div>
                    PLAYER_NAME
                </div>
                <div className='win-stats'>
                    <div>
                        wins 
                    </div>
                    <div>
                        losses 
                    </div>
                    <div>
                        winrate 
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Header;