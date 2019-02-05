import React from 'react';
import { Link } from 'react-router-dom';
import './Join.scss';

function Join (props) {
    return (
        <div className='matches'>
            <h1>Open matches</h1>
            <table className="match-list">
                <tr>
                    <td><b>Creator</b></td>
                    <td><b>Open slots</b></td>
                    <td></td>
                </tr>
                <tr>
                    <td>@notexactlyawe</td>
                    <td>1</td>
                    <td><Link to='/play'>Play!</Link></td>
                </tr>
            </table>
        </div>
    );
}

export default Join;
