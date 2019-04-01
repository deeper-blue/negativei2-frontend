import React from 'react';
import './Spinner.scss'

class Spinner extends React.Component {
    constructor(props){
        super(props);
        this.text = this.props.children || 'Loading...'
    }

    render() {
        return (
            this.props.fullPage
            ?
            <div id='spinner' class='full-page'>
                <img src='/assets/spinner.jpg' alt='' />
                <h1>{this.text}</h1>
            </div>
            :
            <div id='spinner'>
                <img src='/assets/spinner.jpg' alt='' />
                <h1>{this.text}</h1>
            </div>
        );
    }
}

export default Spinner;