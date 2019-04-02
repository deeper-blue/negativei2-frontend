import React from 'react';
import './Create.scss';
import Spinner from '../Spinner';
import { auth } from '../Firebase';
import server from '../Server';

function validate(P1time, P2time, P1, P2, board_id) {
    const errors = [];

    if (P1 === "ME" && P2 === "ME") {
        errors.push("You cannot play against yourself!");
    }
    if(P1time > 120 || P1time < 0){
        errors.push("Player 1 time must be between 0 and 120 minutes!");
    }
    if(P2time > 120 || P2time < 0){
        errors.push("Player 2 time must be between 0 and 120 minutes!")
    }

    return errors;
}

class Create extends React.Component {
    constructor() {
        super();
        this.state = {
            P1: "ME",
            P2: "ME",
            P1time: '0',
            P2time: '0',
            P1time_custom: 40,
            P2time_custom: 40,
            privacy: 'true',
            user: null,
            boardID: '1111',
            errors: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleTimeOptionChange = this.handleTimeOptionChange.bind(this);
        this.handleCustomTimeOptionChange = this.handleCustomTimeOptionChange.bind(this);
        this.handlePrivacyChange = this.handlePrivacyChange.bind(this);
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

        const { P1, P2, P1time_custom, P2time_custom, board_id } = this.state;
        this.setState({ errors: [] });
        const errors = validate(P1time_custom, P2time_custom, P1, P2, board_id);
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

    handleCustomTimeOptionChange(event){
        if(event.target.name === "P1time_custom"){
            this.setState({
                P1time_custom: event.target.value
            })
        } else if(event.target.name === 'P2time_custom') {
            this.setState({
                P2time_custom: event.target.value
            })
        }
    }

    handlePrivacyChange(event) {
        this.setState({
            privacy: event.target.value
        })
    }

    createGame() {
        var formData = new FormData();
        var player1;
        var player2;
        var time;

        // P1 and P2 are not player IDs!!!!
        this.state.P1 === 'ME' ? player1 = this.state.user : player1 = this.state.P1;
        this.state.P2 === 'ME' ? player2 = this.state.user : player2 = this.state.P2;

        if(this.state.P2time === 'custom'){
            time = this.state.P2time_custom;
        } else {
            time = this.state.P2time
        }

        formData.set('creator_id', this.state.user);
        formData.set('player1_id', player1);
        formData.set('player2_id', player2);
        formData.set('time_per_player', time);
        formData.set('board_id', 'kevin');
        formData.set('public', this.state.privacy);

        server.post('/creategame', formData)
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
                            <div>
                                <img src="/assets/deeper-blue/robot-banner/banner-alpha.svg" alt="banner" id="ban"></img>
                            </div>
                            <div id="config_form">
                                <div className='privacy'>
                                    <div>
                                        <label>
                                            <input 
                                                type='radio'
                                                name='privacy'
                                                value='true'
                                                checked={this.state.privacy === 'true'}
                                                onChange={this.handlePrivacyChange}
                                                className='radio-input'
                                            />
                                            Public
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <input 
                                                type='radio'
                                                name='privacy'
                                                value='false'
                                                checked={this.state.privacy === 'false'}
                                                onChange={this.handlePrivacyChange}
                                                className='radio-input'
                                            />
                                            Private
                                        </label>
                                    </div>
                                </div>
                                <div className='player'>
                                    <div className='player-header'>
                                        Player 1
                                    </div>
                                    <div className='player-choice'>
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
                                    {/* <div className='time-choice'>
                                        <div className='time-header'>
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
                                        <div>
                                            <label>
                                                <input
                                                    type='radio'
                                                    name='P1time'
                                                    value='custom'
                                                    checked={this.state.P1time === 'custom'}
                                                    onChange={this.handleTimeOptionChange}
                                                    className='radio-input'
                                                />
                                                Custom: <input
                                                    type='number'
                                                    name='P1time_custom'
                                                    value={this.state.P1time_custom}
                                                    onChange={this.handleCustomTimeChange}
                                                    className=''
                                                    min='0'
                                                    max='120'
                                                />
                                            </label>
                                        </div>
                                    </div> */}
                                </div>
                                <div className='player'>
                                    <div className='player-header'>
                                        Player 2
                                    </div>
                                    <div className='player-choice'>
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
                                    <div className='time-choice'>
                                        <div className='time-header'>
                                            Time Control
                                        </div>
                                        <div>
                                            <label>
                                                <input
                                                    type='radio'
                                                    name='P2time'
                                                    value='999'
                                                    checked={this.state.P2time === "999"}
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
                                        <div>
                                            <label>
                                                <input
                                                    type='radio'
                                                    name='P2time'
                                                    value='custom'
                                                    checked={this.state.P2time === 'custom'}
                                                    onChange={this.handleTimeOptionChange}
                                                    className='radio-input'
                                                />
                                                Custom: <input
                                                    type='number'
                                                    name='P2time_custom'
                                                    value={this.state.P2time_custom}
                                                    onChange={evt => this.setState({P2time_custom: evt.target.value})}
                                                    className=''
                                                    min='0'
                                                    max='120'
                                                />
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
