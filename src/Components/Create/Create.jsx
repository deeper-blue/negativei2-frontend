import React from 'react';
import axios from 'axios';
import './Create.scss';
import Spinner from '../Spinner';
import { auth } from '../Firebase';


function validate(P1time, P2time, P1, P2, board_id, friend_1, friend_2) {
    const errors = [];

    if (P1 === "ME" && P2 === "ME") {
        errors.push("You cannot play against yourself!");
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

        const { P1time, P2time, P1, P2, board_id, friend_1, friend_2 } = this.state;
        this.setState({ errors: [] });
        const errors = validate(P1time, P2time, P1, P2, board_id, friend_1, friend_2);
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
        var player1;
        var player2;

        // P1 and P2 are not player IDs!!!!
        this.state.P1 === 'me' ? player1 = this.state.user : player1 = this.state.P1;
        this.state.P2 === 'me' ? player2 = this.state.user : player2 = this.state.P2;

        formData.set('creator_id', this.state.user);
        formData.set('player1_id', player1);
        formData.set('player2_id', player2);
        formData.set('player1_time', this.state.P1time);
        formData.set('player2_time', this.state.P2time)
        formData.set('board_id', 'kevin');

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
