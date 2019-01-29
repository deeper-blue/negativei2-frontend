import React from 'react';
import './Sidebar.scss'

function Sidebar (props) {
    return (
        <div className="sidebar">
            <div className="turn-indicator">
                <div className="turn-text">
                    Turn:
                </div>
                <div className="turn-icon">
                    White
                </div>
            </div>
            <div className="timer">
                <div className="timer-white">
                    <h1>00:00</h1>
                </div>
                <div className="timer-black">
                    <h1>00:00</h1>
                </div>
            </div>
            <div className="manual-move-input">
                <form>
                    <input type="text" placeholder="Enter move...">

                    </input>
                    <input type="submit" name="input-move" value="Move!">

                    </input>
                </form>
                <div class="toggle-speech-input-wrapper">
                    <div class="toggle-speech-input">
                        <img src="/assets/game/microphone.png" alt="M"></img>
                    </div>
                </div>
                <div class="manual-input-help-wrapper">
                    <div class="manual-input-help">
                        <img src="/assets/game/question-mark.png" alt="?"></img>
                    </div>
                </div>
            </div>
            <div className="move-tracker">
                Move tracker
            </div>
        </div>
    );
}

export default Sidebar