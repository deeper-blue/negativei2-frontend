import React from 'react';
import { Link } from 'react-router-dom';
import './Join.scss';
import axios from 'axios';

const url = 'http://negativei2-server.herokuapp.com/getgame/cpDDuKjtxdHPHumk40P7'

class Join extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            game_list: [],
            game_id: '',
            creator_id: '',
            black_id: '',
            white_id: '',
            game_time: '',
            free_slots: ''
        }
    }

    componentDidMount() {
        this.somehttprequestshit(url);


    }

    somehttprequestshit(url){
        axios.get(url)
            .then(function(response) {
                console.log(response);
                this.parse(response);
            }.bind(this))
            .catch( function (error) {
                console.log(error);
            })
            .then(function (){
                console.log('poop');
            });
    }

    parse(response) {

        this.setState( state => ({
            // game_list: response,
            game_id: response.id,
            creator_id: response
        }));
    }   

    render() {
        return (
            <div className='matches'>
                <h1>Open matches</h1>
                <table className="match-list">
                    <thead>
                        <tr>
                            <th>Game ID</th>
                            <th>Creator ID</th>
                            <th>Open slots</th>
                            <th>Black</th>
                            <th>White</th>
                            <th>Time Limit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.game_list.map((row, index) => (
                                <tr>
                                    <td>{row.id}</td>
                                    <td>{row.creator}</td>
                                    <td>{row.free_slots}</td>
                                    <td>{row.players.black}</td>
                                    <td>{row.players.white}</td>
                                    <td>{row.time}</td>
                                </tr>
                            ))
                        }
                        <tr>
                                <td>asfd</td>
                                <td>asdf</td>
                                <td>asdf</td>
                                <td>asdf</td>
                                <td>asdf</td>
                                <td>asdf</td>
                            </tr>
                        {/* <tr>
                            <td>{this.state.game_list.statusText}</td>
                            <td>1</td>
                            <td><Link to='/play'>Play!</Link></td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Join;
