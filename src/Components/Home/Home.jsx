import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';
import Spinner from '../Spinner';

function Home (props) {
    return (
        <div className='home-links'>
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
