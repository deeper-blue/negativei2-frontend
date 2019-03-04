import React from 'react';
import axios from 'axios';
import './Create.scss';
import { auth } from '../Firebase';


function validate(hours, minutes, P1, P2) {
    const errors = [];

    if (hours.length === 0 || minutes.length === 0) {
        if (hours.length === 0) {
            errors.push("Hours can't be empty");
        }

        if (minutes.length === 0) {
            errors.push("Minutes can't be empty");
        }
    } else {
        if (minutes === '0' && hours === '0') {
            errors.push("You cannot play for 0 seconds and 0 hours");
        }
    }

    if (P1 === "me" && P2 === "me") {
        errors.push("You cannot play against yourself!");
    }

    return errors;
}

class Create extends React.Component {
    constructor() {
        super();
        this.state = {
            hours: "",
            minutes: "",
            P1: "me",
            P2: "me",
            user: '23',
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

        const { hours, minutes, P1, P2 } = this.state;
        this.setState({ errors: [] });
        const errors = validate(hours, minutes, P1, P2);
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
            <form onSubmit={this.handleSubmit} >
                <div id="config_form">
                    <label>
                        Player 1 (White):
                        <br />
                        <select
                            value={this.state.P1}
                            onChange={evt => this.setState({ P1: evt.target.value })}>>
                            <option value="me">Me, myself and I</option>
                            <option value="AI">Deeper Blue</option>
                            <option value="OPEN">Another human</option>
                        </select>
                    </label>
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
                            <option value="OPEN">Another human</option>
                        </select>
                    </label>
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

                    <button type="submit" id="btn_play">
                        Let's play!
                    </button>
                </div>
                <div id="Errors">
                    {errors.map(error => (
                        <p key={error}>Error: {error}</p>
                    ))}
                </div>

            </form>
        );
    }
}


export default Create;
