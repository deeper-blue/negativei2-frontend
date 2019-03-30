import React from 'react';
import './Join.scss';
import axios from 'axios';
import Spinner from '../Spinner';
import firebase, { auth } from '../Firebase';

const url = 'https://negativei2-server.herokuapp.com/'

class Join extends React.Component {

    user_dictionary= {};
    active_games = [];
    active_games_usernames = {};

    constructor(props){
        super(props);

        this.state = {
            loaded: false,
            game_list: [],
            user: null,
            user_dictionary: {}
        }

        this.semaphore = 0;
        this.getUsername = this.getUsername.bind(this);
    }

    componentDidMount() {
        document.title = 'Deeper Blue: Join Game';
        this.getGames();
        this.activeGameUsernames();
        this.httpGetRequest(url + 'gamelist');
        this.initAuthListener();
    }

    getGames() {
        const db = firebase.firestore();
        const docRef = db.collection('games');

        docRef.get()
            .then(function(snapshot)  {
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                } else {
                    snapshot.forEach(function(doc) {
                        if (doc.data().game_over.game_over === false && (doc.data().players.w === this.state.user || doc.data().players.b === this.state.user)) {
                            this.active_games.push(doc.data());
                        }
                    }.bind(this))
                    .catch(err => {
                        console.log('Error getting documents', err);
                    });
                }
            }.bind(this));
    }

    activeGameUsernames() {
        const db = firebase.firestore();
        const docRef = db.collection('users');

        docRef.get().then(function(response) {
            if (response.empty) {
                console.log('Does not exist!');
                return;
            } else {
                response.forEach(function(doc) {
                    this.active_games_usernames[doc.id] = doc.data().name;
                }.bind(this))
                .catch(err => {
                    console.log('Error getting documents', err);
                });
            }
        }.bind(this));
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
        var id_set = new Set();
        console.log(response)

        this.setState( state => ({
            game_list: response,
            game_id: response.id,
        }));

        response.data.forEach(function(element) {
            if(element.creator){id_set.add(element.creator)}
            if(element.b){id_set.add(element.b)}
            if(element.w){id_set.add(element.w)}
        });

        id_set.forEach(function(element){
            if(this.semaphore === null){
                this.semaphore = 0;
            } else {
                this.semaphore++;
            }
            this.getUsername(element);
        }.bind(this));
    }

    getUsername(user_id) {
        const db = firebase.firestore();
        const docRef = db.collection('users').doc(user_id);

        docRef.get().then(function(response) {
            if(response.exists){
                this.user_dictionary[user_id] = response.data().name;
            }
            this.semaphore--;
            if(this.semaphore === 0){
                this.setState({
                    user_dictionary: this.user_dictionary
                });
            }
        }.bind(this));
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

    joinGame(game_id, side, e) {
        var formData = new FormData();
        formData.set('game_id', game_id);
        formData.set('player_id', this.state.user);
        formData.set('side', side);

        this.httpPostRequest(url + 'joingame', formData);
    }

    render() {
        return (
            <div>
                {this.state.loaded && this.state.user ?
                <div className='matches'>
                    <h1>Invited/Active matches</h1>
                    {this.semaphore === 0 ?
                    <table className="match-list">
                        <thead>
                            <tr>
                                <th>Game ID</th>
                                <th>Creator ID</th>
                                <th>White</th>
                                <th>Black</th>
                                <th>Game</th>
                                <th>Time Limit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.active_games.map(game => (
                                    <tr>
                                        <td>{game.id}</td>
                                        <td><button className="username_btn" onClick={() => this.props.history.push('/profile/' + game.creator)}>{this.active_games_usernames[game.creator]}</button></td>
                                        <td>{game.players.w ? <button className="username_btn" onClick={() => this.props.history.push('/profile/' + game.players.w)}>{this.active_games_usernames[game.players.w]}</button> : "-"}</td>
                                        <td>{game.players.b ? <button className="username_btn" onClick={() => this.props.history.push('/profile/' + game.players.b)}>{this.active_games_usernames[game.players.b]}</button> : "-"}</td>
                                        <td>{<button onClick={() => this.props.history.push('/play/' + game.id)}>Go</button>}</td>
                                        <td>{game.time_controls}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    : <Spinner fullPage={false}/>}

                    <h1>Open matches</h1>
                    {this.semaphore === 0 ?
                    <table className="match-list">
                        <thead>
                            <tr>
                                <th>Game ID</th>
                                <th>Creator ID</th>
                                <th>Open slots</th>
                                <th>White</th>
                                <th>Black</th>
                                <th>Time Limit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.game_list.data.map((row, index) => (
                                    row.free_slots = 0 ? null :
                                    this.state.user === row.players.w ? null :
                                    this.state.user === row.players.b ? null :
                                    <tr>
                                        <td>{row.id}</td>
                                        <td><button className="username_btn" onClick={() => this.props.history.push('/profile/' + row.creator)}>{this.state.user_dictionary[row.creator]}</button></td>
                                        <td>{row.free_slots}</td>
                                        <td>{row.players.w ? <button className="username_btn" onClick={() => this.props.history.push('/profile/' + row.players.w)}>{this.state.user_dictionary[row.players.w]}</button> : <button onClick={(game_id, side, e) => this.joinGame(row.id, 'w')}>PLAY</button>}</td>
                                        <td>{row.players.b ? <button className="username_btn" onClick={() => this.props.history.push('/profile/' + row.players.b)}>{this.state.user_dictionary[row.players.b]}</button> : <button onClick={(game_id, side, e) => this.joinGame(row.id, 'b')}>PLAY</button>}</td>
                                        <td>{row.time_controls}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    : <Spinner fullPage={false}/>}
                </div> :
                <Spinner fullPage={true}/>}
            </div>
        );
    }
}

export default Join;
