import React, {Component} from 'react';
import './FourOhFour.scss';

class FourOhFour extends Component {

    componentDidMount() {
        document.title = 'Deeper Blue: 404';
    }

    render() {
        return(
            <div id='container'>
                <div id="wrapper">
                    <h1>404</h1>
                    <div id='info'>
                        <p><b>Woops!</b></p>
                        <p>Looks like we couldn't find that page!</p>
                        <p>Maybe you'd like to go back to our <a href="/" class="link-dark-blue shadow">home page</a>?</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default FourOhFour;