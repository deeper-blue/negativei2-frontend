import React from 'react';
// import { Link } from 'react-router-dom';
import './Join.scss';
import axios from 'axios';
import Spinner from '../Spinner';

const url = 'https://negativei2-server.herokuapp.com/gamelist'

class Join extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            loaded: false,
            game_list: []
        }
    }

    componentDidMount() {
        this.httpRequest(url);
    }

    httpRequest(url){
        axios.get(url)
            .then(function(response) {
                console.log(response);
                this.parse(response);
            }.bind(this))
            .catch( function (error) {
                console.log(error);
            })
            .then(function (){
                this.setState( state => ({
                    loaded: true,
                }));
            }.bind(this));
    }

    parse(response) {

        this.setState( state => ({
            game_list: response,
            game_id: response.id,
            creator_id: response
        }));
    }   

    render() {
        return (
            <div>
                {this.state.loaded ?
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
                                this.state.game_list.data.map((row, index) => (
                                    row.free_slots = 0 ? null :
                                    <tr>
                                        <td>{row.id}</td>
                                        <td>{row.creator}</td>
                                        <td>{row.free_slots}</td>
                                        <td>{row.players.b ? row.players.b : 'PLAY'}</td>
                                        <td>{row.players.w ? row.players.w : 'PLAY'}</td>
                                        <td>{row.time_controls}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div> :
                <Spinner />}
            </div>
        );
    }
}

export default Join;
