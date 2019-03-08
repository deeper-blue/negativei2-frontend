import React from 'react';
import './Header.scss';
import PlayerStats from './PlayerStats';

class Header extends React.Component {
    render(){
        return (
            <div>
                <div className="header">
                    <div className="profile-picture">
                        <img src={this.props.profileData.pic} className='image' alt="logo" />
                    </div>
                    <div className='player-info'>
                        <div className='profile-name'>
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