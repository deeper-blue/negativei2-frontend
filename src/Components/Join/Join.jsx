import React from 'react';
import { Link } from 'react-router-dom';
import './Join.scss';
import axios from 'axios';

const sum = 'http://negativei2-server.herokuapp.com/getgame/sadjlsda'

class Join extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            doodoo: ''
        }
    }

    componentDidMount() {
        this.somehttprequestshit(sum);


    }

    somehttprequestshit(url){
        axios.get(url)
            .then(function(response) {
                console.log(response);
                this.fuck(response);
            }.bind(this))
            .catch( function (error) {
                console.log(error);
            })
            .then(function (){
                console.log('poop');
            });
    }

    fuck(shit) {
        this.setState( state => ({
            doodoo: shit
        }))
    }   

    render() {
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
                        <td>{this.state.doodoo.statusText}</td>
                        <td>1</td>
                        <td><Link to='/play'>Play!</Link></td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default Join;
