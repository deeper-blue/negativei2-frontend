import React from 'react';
import './Spinner.scss'

class Spinner extends React.Component {
    render(){
        return (
            <div id='spinner'>
                <img src='/assets/spinner.gif' alt='' />
                <h1>Loading...</h1>
            </div>
        );
    }
}

export default Spinner;