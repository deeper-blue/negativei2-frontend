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
            P1: "ME",
            P2: "ME",
            P1time: '0',
            P2time: '0',
            user: null,
            board_id: "kevin",
            friend_1: "",
            friend_2: "",
            errors: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleTimeOptionChange = this.handleTimeOptionChange.bind(this);
    }

    componentDidMount() {
        document.title = 'Deeper Blue: Create Game';
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

    handleOptionChange(event) {
        if(event.target.name === "P1"){
            this.setState({
                P1: event.target.value
            })
        } else if(event.target.name === "P2") {
            this.setState({
                P2: event.target.value
            })
        }
    }

    handleTimeOptionChange(event) {
        if(event.target.name === "P1time"){
            this.setState({
                P1time: event.target.value
            })
        } else if(event.target.name === "P2time"){
            this.setState({
                P2time: event.target.value
            })
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
            <div className='container'>
                {
                    this.state.user ?
                        <form className='form' onSubmit={this.handleSubmit} >
                            <div id="config_form">
                                <div className='player'>
                                    <div>
                                        Player 1
                                    </div>
                                    <div>
                                        <div>
                                            <label>
                                                <input
                                                    type='radio'
                                                    name='P1'
                                                    value='ME'
                                                    checked={this.state.P1 === "ME"}
                                                    onChange={this.handleOptionChange}
                                                    className='radio-input'
                                                />
                                                Me, myself and I
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <input
                                                    type='radio'
                                                    name='P1'
                                                    value='AI'
                                                    checked={this.state.P1 === "AI"}
                                                    onChange={this.handleOptionChange}
                                                    className='radio-input'
                                                />
                                                Deeper Blue
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <input
                                                    type='radio'
                                                    name='P1'
                                                    value='OPEN'
                                                    checked={this.state.P1 === "OPEN"}
                                                    onChange={this.handleOptionChange}
                                                    className='radio-input'
                                                />
                                                Open slot
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            Time Control
                                        </div>
                                        <div>
                                            <label>
                                                <input
                                                    type='radio'
                                                    name='P1time'
                                                    value='0'
                                                    checked={this.state.P1time === "0"}
                                                    onChange={this.handleTimeOptionChange}
                                                    className='radio-input'
                                                />
                                                No time limit
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <input
                                                    type='radio'
                                                    name='P1time'
                                                    value='30'
                                                    checked={this.state.P1time === "30"}
                                                    onChange={this.handleTimeOptionChange}
                                                    className='radio-input'
                                                />
                                                30 minutes
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <input
                                                    type='radio'
                                                    name='P1time'
                                                    value='60'
                                                    checked={this.state.P1time === "60"}
                                                    onChange={this.handleTimeOptionChange}
                                                    className='radio-input'
                                                />
                                                60 minutes
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className='player'>
                                    <div>
                                        Player 2
                                    </div>
                                    <div>
                                        <div>
                                            <label>
                                                <input
                                                    type='radio'
                                                    name='P2'
                                                    value='ME'
                                                    checked={this.state.P2 === "ME"}
                                                    onChange={this.handleOptionChange}
                                                    className='radio-input'
                                                />
                                                Me, myself and I
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <input
                                                    type='radio'
                                                    name='P2'
                                                    value='AI'
                                                    checked={this.state.P2 === "AI"}
                                                    onChange={this.handleOptionChange}
                                                    className='radio-input'
                                                />
                                                Deeper Blue
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <input
                                                    type='radio'
                                                    name='P2'
                                                    value='OPEN'
                                                    checked={this.state.P2 === "OPEN"}
                                                    onChange={this.handleOptionChange}
                                                    className='radio-input'
                                                />
                                                Open slot
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            Time Control
                                        </div>
                                        <div>
                                            <label>
                                                <input
                                                    type='radio'
                                                    name='P2time'
                                                    value='0'
                                                    checked={this.state.P2time === "0"}
                                                    onChange={this.handleTimeOptionChange}
                                                    className='radio-input'
                                                />
                                                No time limit
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <input
                                                    type='radio'
                                                    name='P2time'
                                                    value='30'
                                                    checked={this.state.P2time === "30"}
                                                    onChange={this.handleTimeOptionChange}
                                                    className='radio-input'
                                                />
                                                30 minutes
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <input
                                                    type='radio'
                                                    name='P2time'
                                                    value='60'
                                                    checked={this.state.P2time === "60"}
                                                    onChange={this.handleTimeOptionChange}
                                                    className='radio-input'
                                                />
                                                60 minutes
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                Hours:
                                <input
                                    value={this.state.hours}
                                    onChange={evt => this.setState({ hours: evt.target.value })}
                                    type="number"
                                    placeholder="Hours"
                                    min="0"
                                    max="2"
                                />
                                Minutes:
                                <input
                                    value={this.state.minutes}
                                    onChange={evt => this.setState({ minutes: evt.target.value })}
                                    type="number"
                                    placeholder="Minutes"
                                    min="0"
                                    max="59"
                                />

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
                        <Spinner fullPage={true}/>
                }
            </div>
        );
    }
}

export default Create;
