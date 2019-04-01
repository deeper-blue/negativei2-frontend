import React from 'react';
import './Join.scss';
import Spinner from '../Spinner';
import firebase, { auth } from '../Firebase';
import server from '../Server';

class Join extends React.Component {

    user_dictionary= {};

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
        this.getNameFromId = this.getNameFromId.bind(this);
    }

    componentDidMount() {
        document.title = 'Deeper Blue: Join Game';
        this.httpGetRequest('/gamelist');
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

    httpGetRequest(endpoint){
        server.get(endpoint)
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

    httpPostRequest(endpoint, data) {
        server.post(endpoint, data)
            .then(function(response) {
                this.props.history.push('/play/' + response.data.id);
            }.bind(this))
            .catch(function(error) {
                console.log(error);
            })
    }

    parse(response) {
        var id_set = new Set();

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
                console.log(response.data.name);
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

    joinGame(game_id, side, e) {
        var formData = new FormData();
        formData.set('game_id', game_id);
        formData.set('player_id', this.state.user);
        formData.set('side', side);

        this.httpPostRequest('/joingame', formData);
    }

    getNameFromId(user_id) {
        if(!this.state.user_dictionary[user_id]) {
            return('Guest');
        } else {
            return(this.state.user_dictionary[user_id]);
        }
    }

    render() {
        return (
            <div>
                {this.state.loaded && this.state.user ?
                <div className='matches'>
                    <h1>Open matches</h1>
                    {this.semaphore === 0 ?
                    <table className="match-list">
                        <thead>
                            <tr>
                                <th>Game ID</th>
                                <th>Creator</th>
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
                                    <tr>
                                        <td>{row.id}</td>
                                        <td>{this.state.user_dictionary[row.creator]}</td>
                                        <td>{row.free_slots}</td>
                                        <td>{row.players.w ? this.getNameFromId(row.players.w) : <button onClick={(game_id, side, e) => this.joinGame(row.id, 'w')}>PLAY</button>}</td>
                                        <td>{row.players.b ? this.getNameFromId(row.players.b) : <button onClick={(game_id, side, e) => this.joinGame(row.id, 'b')}>PLAY</button>}</td>
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
