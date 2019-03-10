import React from 'react';
import './Sidebar.scss'

function Sidebar (props) {
    return (
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
                <form id="move-input-form">
                    <input
                    id="move-input-text"
                    type="text"
                    placeholder="Enter move..."
                    ></input>
                    <input id="move-input-submit" type="submit" name="input-move" value="Move!" className="button small small-font"></input>
                </form>
                <div id="manual-input-help-wrapper">
                    <div
                    id="manual-input-help"
                    tooltip-large="Moves can be input by specifying the source and target squares, e.g. 'e2e4' (even 'e2 e4'), or 'f6e4'."
                    tooltip-position="left"
                    >
                        <img src="/assets/game/question-mark.png" alt="?"></img>
                    </div>
                </div>
                <div id="toggle-speech-input-wrapper">
                    <div id="toggle-speech-input" tooltip-large="Toggle speech input" tooltip-position="left">
                        <img src="/assets/game/microphone.png" alt="M"></img>
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
    );
}

export default Sidebar;