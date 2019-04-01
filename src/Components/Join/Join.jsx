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

                            if(doc.data().creator){this.active_games_usernames[doc.data().creator] = "Guest"}
                            if(doc.data().players.b){this.active_games_usernames[doc.data().players.b] = "Guest"}
                            if(doc.data().players.w){this.active_games_usernames[doc.data().players.w] = "Guest"}
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
                    if (typeof doc.data().name === 'undefined') {
                        this.active_games_usernames[doc.id] = 'Guest';
                    } else {
                        this.active_games_usernames[doc.id] = doc.data().name;
                    }
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
                if (typeof response.data().name === 'undefined') {
                    this.user_dictionary[user_id] = 'Guest';
                } else {
                    this.user_dictionary[user_id] = response.data().name;
                }
            } else {
                this.user_dictionary[user_id] = 'Guest';
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
                    <h1
                    tooltip-very-large="Displays all of the games that you are currently playing."
                    tooltip-position="right"
                    >
                    Active matches</h1>
                    {this.semaphore === 0 ?
                    <table className="match-list">
                        <thead>
                            <tr>
                                <th
                                tooltip-very-large="ID of the game."
                                tooltip-position="top"
                                >Game ID</th>
                                <th
                                tooltip-very-large="Username of the person who created the game. Tip: Click the username to view their profile!"
                                tooltip-position="top"
                                >Creator ID</th>
                                <th
                                tooltip-very-large="Username of the person who is playing as white. The '-' means no-one is playing as white. Tip: Click the username to view their profile!"
                                tooltip-position="top"
                                >White</th>
                                <th
                                tooltip-very-large="Username of the person who is playing as black. The '-' means no-one is playing as black. Tip: Click the username to view their profile!"
                                tooltip-position="top"
                                >Black</th>
                                <th
                                tooltip-very-large="The button 'GO' takes you to the game."
                                tooltip-position="top"
                                >Game</th>
                                <th
                                tooltip-very-large="The time limit for each game."
                                tooltip-position="top"
                                >Time Limit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.active_games.map(game => (
                                    <tr>
                                        <td>{game.id}</td>
                                        <td><button className="username_btn" onClick={() => this.props.history.push('/profile/' + game.creator)}>{this.active_games_usernames[game.creator]}</button></td>
                                        <td>{game.players.w ? <button className="username_btn" onClick={() => this.props.history.push('/profile/' + game.players.w)}>{game.players.w === "AI" ? "AI" : this.active_games_usernames[game.players.w]}</button> : "-"}</td>
                                        <td>{game.players.b ? <button className="username_btn" onClick={() => this.props.history.push('/profile/' + game.players.b)}>{game.players.b === "AI" ? "AI" : this.active_games_usernames[game.players.b]}</button> : "-"}</td>
                                        <td>{<button onClick={() => this.props.history.push('/play/' + game.id)}>GO</button>}</td>
                                        <td>{game.time_controls}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    : <Spinner fullPage={false}/>}

                    <h1
                    tooltip-very-large="Displays all of the games that you are not currently playing and that have at least one open slot."
                    tooltip-position="right"
                    >Open matches</h1>
                    {this.semaphore === 0 ?
                    <table className="match-list">
                        <thead>
                            <tr>
                                <th
                                tooltip-very-large="ID of the game."
                                tooltip-position="top"
                                >Game ID</th>
                                <th
                                tooltip-very-large="Username of the person who created the game. Tip: Click the username to view their profile!"
                                tooltip-position="top"
                                >Creator ID</th>
                                <th
                                tooltip-very-large="The open slots tells us the number of players that will need to join for the game to begin."
                                tooltip-position="top"
                                >Open slots</th>
                                <th
                                tooltip-very-large="This will contain the username of a player who is playing as white or it will contain a button called 'PLAY' which allows you to join the game playing as white. Tip: Click the username to view their profile!"
                                tooltip-position="top"
                                >White</th>
                                <th
                                tooltip-very-large="This will contain the username of a player who is playing as black or it will contain a button called 'PLAY' which allows you to join the game playing as black. Tip: Click the username to view their profile!"
                                tooltip-position="top"
                                >Black</th>
                                <th
                                tooltip-very-large="The time limit for each game."
                                tooltip-position="top"
                                >Time Limit</th>
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
                                        <td>{row.players.w ? <button className="username_btn" onClick={() => this.props.history.push('/profile/' + row.players.w)}>{row.players.w === "AI" ? "AI" : this.state.user_dictionary[row.players.w]}</button> : <button onClick={(game_id, side, e) => this.joinGame(row.id, 'w')}>PLAY</button>}</td>
                                        <td>{row.players.b ? <button className="username_btn" onClick={() => this.props.history.push('/profile/' + row.players.b)}>{row.players.b === "AI" ? "AI" : this.state.user_dictionary[row.players.b]}</button> : <button onClick={(game_id, side, e) => this.joinGame(row.id, 'b')}>PLAY</button>}</td>
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
