import React, { Component } from 'react';
import './Sidebar.scss'

class Sidebar extends Component {
    currentTab = 'game';


    openTab = t => {
        if (this.currentTab === t) return;

        this.currentTab = t;

        var tab = `${t}-tab`;

        var headers = document.getElementsByClassName('tab-header');
        for (var i = 0; i < headers.length; i++) {
            headers[i].classList.toggle('active-tab');
        }

        var tabs = document.getElementsByClassName('tab');
        for (var j = 0; j < tabs.length; j++) {
            tabs[j].style.display = "none";
        }

        document.getElementById(tab).style.display = "block";
    }

    handleSubmit = event => {
        event.preventDefault();
        const data = new FormData(event.target);
        var move = data.get('move');
        // TODO: Actually make the requested move.
        console.log(move);
    }

    render() {
        return (
            <div id="sidebar">
                <div id="tab-headers">
                    <button
                    id="game-header"
                    className="tab-header active-tab"
                    onClick={() => this.openTab('game')}
                    >Game
                    </button>

                    <button
                    id="moves-header"
                    className="tab-header"
                    onClick={() => this.openTab('moves')}
                    >Moves
                    </button>
                </div>
                <div id="tabs">
                    <div id="game-tab" className="tab">
                        <div id="game-tab-wrapper">
                            <div id="turn-indicator">
                                <div id="turn-text">
                                    Turn:
                                </div>
                                <div id="turn-icon">
                                    White
                                </div>
                            </div>
                            <div id="timer">
                                <div id="timer-white">
                                    <h2>00:00</h2>
                                </div>
                                <div id="timer-black">
                                    <h2>00:00</h2>
                                </div>
                            </div>
                            <div id="manual-move-input">
                                <form onSubmit={this.handleSubmit}>
                                    <input name="move" type="text" placeholder="Enter move..."></input>
                                    <input
                                    type="submit"
                                    name="input-move"
                                    value="Move!"
                                    className="button small small-font">
                                    </input>
                                </form>
                                <div id="toggle-speech-input-wrapper">
                                    <div id="toggle-speech-input">
                                        <img src="/assets/game/microphone.png" alt="M"></img>
                                    </div>
                                </div>
                                <div id="manual-input-help-wrapper">
                                    <div id="manual-input-help">
                                        <img src="/assets/game/question-mark.png" alt="?"></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="moves-tab" className="tab">
                        <div id="moves-tab-wrapper">
                            <table id="move-tracker">
                                <tbody>
                                    <tr>
                                        <th>No.</th>
                                        <th>White</th>
                                        <th>Black</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;