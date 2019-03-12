import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

function Home (props) {
    document.title = 'Deeper Blue: Home';

    return (
        <div className='home-links'>
            <img src="/assets/deeper-blue/robot-banner/banner-alpha.svg" alt="banner" id="banner"></img>
            <Link to='/create' className="button large large-font home-link">
                Create game
            </Link>
            <Link to='/join' className="button large large-font home-link">
                Join game
            </Link>
        </div>
    );
}

export default Home;
