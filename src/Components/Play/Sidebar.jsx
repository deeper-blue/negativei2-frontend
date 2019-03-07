import React from 'react';
import './Sidebar.scss'

var currentTab = 'game';

function openTab(t) {
    if (currentTab === t) return;

    currentTab = t;

    var header = `${t}-header`;
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
    document.getElementById(header);
}

function Sidebar (props) {
    return (
        <div id="sidebar">
            <div id="tab-headers">
                <button
                id="game-header"
                class="tab-header active-tab"
                onClick={() => openTab('game')}
                >Game
                </button>

                <button
                id="moves-header"
                class="tab-header"
                onClick={() => openTab('moves')}
                >Moves
                </button>
            </div>
            <div id="tabs">
                <div id="game-tab" class="tab">
                    <div id="game-tab-wrapper">
                    Game controls
                    </div>
                </div>
                <div id="moves-tab" class="tab">
                    <div id="move-tab-wrapper">
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

export default Sidebar;

/*
        <div id="sidebar">
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
                    <h1>00:00</h1>
                </div>
                <div id="timer-black">
                    <h1>00:00</h1>
                </div>
            </div>
            <div id="manual-move-input">
                <form>
                    <input type="text" placeholder="Enter move..."></input>
                    <input type="submit" name="input-move" value="Move!" className="button small small-font"></input>
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
            <div id="move-tracker-wrapper">
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
*/