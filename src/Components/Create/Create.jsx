import React from 'react';
import axios from 'axios';
import './Create.scss';
import Spinner from '../Spinner';
import { auth } from '../Firebase';


function validate(hours, minutes, P1, P2, board_id, friend_1, friend_2) {
    const errors = [];

    if (board_id !== "kevin") {
        // check if board id is available DYNAMICALLY
        errors.push("Board not available!");
    }
    if (hours.length === 0 || minutes.length === 0) {
        if (hours.length === 0) {
            errors.push("Hours can't be empty");
        }

        if (minutes.length === 0) {
            errors.push("Minutes can't be empty");
        }
    } else {
        if (minutes === 0 && hours === 0) {
            errors.push("You cannot play for 0 seconds and 0 hours");
        }
    }

    if (P1 === "me" && P2 === "me") {
        errors.push("You cannot play against yourself!");
    }

    if (P1 === "friend"){
        if (friend_1 === ""){
            errors.push("Add a username for player 1");
        } else if (friend_1 !== "kevin123"){
            // check if friend_1 is a valid username DYNAMICALLY
            errors.push("Player 1 username is not valid");
        }
    }
    if (P2 === "friend"){
        if (friend_2 === ""){
            errors.push("Add a username for player 2");
        } else if (friend_2 !== "kevin321"){
            // check if friend_2 is a valid username DYNAMICALLY
            errors.push("Player 2 username is not valid");
        }
    }

    return errors;
}

class Create extends React.Component {
    constructor() {
        super();
        this.state = {
            hours: 0,
            minutes: 0,
            P1: "me",
            P2: "me",
            user: null,
            board_id: "kevin",
            friend_1: "",
            friend_2: "",
            errors: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
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

    handleSubmit(e) {
        e.preventDefault();

        const { hours, minutes, P1, P2, board_id, friend_1, friend_2 } = this.state;
        this.setState({ errors: [] });
        const errors = validate(hours, minutes, P1, P2, board_id, friend_1, friend_2);
        if (errors.length > 0) {
            this.setState({ errors });
            return;
        } else {
            this.createGame();
        }
    }

    createGame() {
        var formData = new FormData();
        var time = (this.state.hours * 3600) + (this.state.minutes * 60);
        var player1;
        var player2;

        // P1 and P2 are not player IDs!!!!
        this.state.P1 === 'me' ? player1 = this.state.user : player1 = this.state.P1;
        this.state.P2 === 'me' ? player2 = this.state.user : player2 = this.state.P2;

        formData.set('creator_id', this.state.user);
        formData.set('player1_id', player1);
        formData.set('player2_id', player2);
        formData.set('board_id', 'kevin');
        formData.set('time_per_player', time);

        axios.post('https://negativei2-server.herokuapp.com/creategame', formData)
            .then(function (response) {
                console.log(response);
                console.log('/play/' + response.data.id);
                this.props.history.push('/play/' + response.data.id);
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        const { errors } = this.state;
        return (
            <div>
                {
                    this.state.user ?
                        <form onSubmit={this.handleSubmit} >
                            <div id="config_form">
                                <br />
                                Board ID:
                                <br />
                                <input
                                    value={this.state.board_id}
                                    onChange={evt => this.setState({ board_id: evt.target.value })}
                                    type="text"
                                    placeholder="kevin"
                                />
                                <br />
                                <br />
                                <label>
                                    Player 1 (White):
                                    <br />
                                    <select
                                        value={this.state.P1}
                                        onChange={evt => this.setState({ P1: evt.target.value })}>>
                                        <option value="me">Me, myself and I</option>
                                        <option value="AI">Deeper Blue</option>
                                        <option value="friend">A friend</option>
                                        <option value="OPEN">Random player</option>
                                    </select>
                                </label>
                                <br />
                                Friend username:
                                <br />
                                <input
                                    value={this.state.friend_1}
                                    onChange={evt => this.setState({ friend_1: evt.target.value })}
                                    type="text"
                                    placeholder="kevin123"
                                />
                                <br />
                                <br />
                                <label>
                                    Player 2 (Black):
                                    <br />
                                    <select
                                        value={this.state.P2}
                                        onChange={evt => this.setState({ P2: evt.target.value })}>
                                        <option value="me">Me, myself and I</option>
                                        <option value="AI">Deeper Blue</option>
                                        <option value="friend">A friend</option>
                                        <option value="OPEN">Random player</option>
                                    </select>
                                </label>
                                <br />
                                Friend username:
                                <br />
                                <input
                                    value={this.state.friend_2}
                                    onChange={evt => this.setState({ friend_2: evt.target.value })}
                                    type="text"
                                    placeholder="kevin321"
                                />
                                <br />
                                <br />
                                Hours:
                                <br />
                                <input
                                    value={this.state.hours}
                                    onChange={evt => this.setState({ hours: evt.target.value })}
                                    type="number"
                                    placeholder="Hours"
                                    min="0"
                                    max="2"
                                />
                                <br />
                                <br />
                                Minutes:
                                <br />
                                <input
                                    value={this.state.minutes}
                                    onChange={evt => this.setState({ minutes: evt.target.value })}
                                    type="number"
                                    placeholder="Minutes"
                                    min="0"
                                    max="59"
                                />
                                <br />
                                <br />

                                <button type="submit" className = "button large large-font home-link">
                                    Let's play!
                                </button>
                            </div>
                            <div id="Errors">
                                {errors.map(error => (
                                    <p key={error}>Error: {error}</p>
                                ))}
                            </div>

                        </form>
                        :
                        <Spinner />
                }
            </div>
        );
    }
}

export default Create;
