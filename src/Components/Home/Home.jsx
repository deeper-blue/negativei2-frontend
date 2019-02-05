import React from 'react';
import './Home.scss';

function Home (props) {
    return (
        <div className='home-links'>
            <Link to='/create' className='home-link'>Create game</Link>
            <Link to='/play' className='home-link'>Play game</Link>
        </div>
    );
}

export default Home;
