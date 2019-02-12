import React from 'react';
import './Header.scss';
import PlayerStats from './PlayerStats';

class Header extends React.Component {
    render(){
        return (
            <div>
                <div className="header">
                    <div className="profile-picture">
                        <img src='/assets/profile.jpg' className='image' alt="logo" />
                    </div>
                    <div className='player-info'>
                        <div>
                            {this.props.profileData.name}
                        </div>
                        <PlayerStats profileData={this.props.profileData} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;