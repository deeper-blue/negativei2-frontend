import React from 'react';
import './Spinner.scss'

class Spinner extends React.Component {
    render() {
        return (
            this.props.fullPage
            ?
            <div id='spinner' className='full-page'>
                <img src='/assets/spinner.jpg' alt='' />
                <h1>Loading...</h1>
            </div>
            :
            <div id='spinner'>
                <img src='/assets/spinner.jpg' alt='' />
                <h1>Loading...</h1>
            </div>
        );
    }
}

export default Spinner;