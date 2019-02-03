import React, { Component } from 'react';
import Header from './Header';
import './Profile.scss';

class Profile extends Component {

    render() {
        return (
            <div className='profile'>
                <div className='content'>
                    <Header />
                    
                </div>
            </div>
        );
    }
}

export default Profile;