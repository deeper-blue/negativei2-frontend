import React from 'react';
import { Link } from 'react-router-dom';
import './Join.scss';
import axios from 'axios';
import Spinner from '../Spinner';
import { auth } from '../Firebase';

const url = 'https://negativei2-server.herokuapp.com/'

class Join extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            loaded: false,
            game_list: [],
            user: null
        }

        this.joinGame = this.joinGame.bind(this);
    }

    componentDidMount() {
        this.httpGetRequest(url + 'gamelist');
        this.initAuthListener();
    }

    initAuthListener(){
        auth.onAuthStateChanged(function (user) {
            if (user) {
                this.setState({user: user.uid});
            } else {
                this.setState({user: 'none'});
            }
        }.bind(this));
    }

    httpGetRequest(url){
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

    httpPostRequest(url, data) {
        axios.post(url, data)
            .then(function(response) {
                console.log(response);
                this.props.history.push('/play/' + response.data.id);
            }.bind(this))
            .catch(function(error) {
                console.log(error);
            })
    }

    joinGame(game_id, side) {
        var formData = new FormData();
        formData.set('game_id', game_id);
        formData.set('player_id', this.state.user);
        formData.set('side', side);

        console.log('okay')

        // this.httpPostRequest(url + 'joingame', formData);
    }

    render() {
        return (
            <div>
                {this.state.loaded && this.state.user ?
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
                                        <td>{row.players.b ? row.players.b : <Link to={'play/' + row.id}>PLAY</Link>}</td>
                                        <td>{row.players.w ? row.players.w : <Link to={'play/' + row.id}>PLAY</Link>}</td>
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
