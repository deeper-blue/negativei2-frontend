import React, { Component } from 'react';
import './Sidebar.scss'

class Sidebar extends Component {
    SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
    SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

    state = {
        currentTab: 'game',
        speechSupported: true,
        speechToggled: false
    }

    componentDidMount() {
        try {
            // Try to set up speech recognition
            this.recognition = new this.SpeechRecognition();
            this.recognition.lang = 'en-US';
            this.recognition.interimResults = false;
            this.recognition.maxAlternatives = 1;
            this.recognition.continuous = true;
        } catch(error) {
            if (error instanceof TypeError) {
                // Speech input not supported
                this.setState({speechSupported: false}, () => {
                    let toggle = document.getElementById('toggle-speech-input');
                    toggle.classList.toggle('disabled');
                    toggle.setAttribute("tooltip-large", 'Speech input is not supported on your browser.');
                });
            } else {
                throw error;
            }
        }
    }

    /** Toggles speech input. */
    toggleSpeech = () => {
        var toggle = document.getElementById('toggle-speech-input');
        var moveSubmit = document.getElementById('move-input-form');

        if (this.state.speechSupported) {
            toggle.classList.toggle('change');
            if (this.state.speechToggled) {
                // Disabled
                toggle.setAttribute("tooltip-large", "Enable speech input");
                moveSubmit.removeAttribute("tooltip-large")
                this.setState({speechToggled: false}, this.handleSpeech);
            } else {
                // Enabled
                toggle.setAttribute("tooltip-large", "Disable speech input");
                moveSubmit.setAttribute("tooltip-large", "You can submit a move with speech by saying 'move' after specifying the move.");
                this.setState({speechToggled: true}, this.handleSpeech);
            }
            document.getElementById('move-input-text').value = '';
        }
    }

    /** Cleans a transcript by lowercasing and performing a substitution
     * according to a map of common homophones and similar incorrect words.
     * @param {string} transcript - The transcript to clean.
     * @returns {string} - The cleaned transcript.
     */
    cleanTranscript = (transcript) => {
        transcript = transcript.toLowerCase();

        // Substitution map for homophones or similar incorrect words
        var substitutionMap = {
            eh: 'a',
            bee: 'b', be: 'b', me: 'b',
            see: 'c', sea: 'c',
            of: 'f',
            one: '1', won: '1',
            two: '2', to: '2', too: '2',
            three: '3', tree: '3', free: '3',
            four: '4', fore: '4', for: '4',
            five: '5', hive: '5',
            six: '6', sex: '6', sax: '6',
            seven: '7',
            eight: '8', ate: '8', hate: '8',
            moo: 'move',
            queer: 'clear'
        }

        // Replace any words present in the substitution map
        Object.keys(substitutionMap).forEach(function (incorrect) {
            transcript = transcript.replace(new RegExp(incorrect, 'gi'), substitutionMap[incorrect]);
        });

        return transcript;
    }

    /** Handles speech recognition and transcripts. */
    handleSpeech = () => {
        if (this.state.speechToggled) {
            this.recognition.start();

            var input = document.getElementById('move-input-text');

            let finalTranscript = ''
            this.recognition.onresult = event => {
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = this.cleanTranscript(event.results[i][0].transcript);
                    if (event.results[i].isFinal) finalTranscript += transcript + ' '
                }

                input.value = finalTranscript

                if (finalTranscript.includes('clear')) {
                    // Clear command
                    finalTranscript = '';
                    input.value = finalTranscript;
                }
                if (finalTranscript.includes('move')) {
                    // Move command
                    finalTranscript = finalTranscript.replace(/move/gi, '');
                    input.value = finalTranscript;

                    document.getElementById('move-input-submit').click();

                    finalTranscript = '';
                    input.value = finalTranscript;
                }
            }
        } else {
            this.recognition.stop();
        }
    }

    openTab = t => {
        if (this.state.currentTab === t) return;

        this.setState({currentTab: t});

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
                                <form id="move-input-form">
                                    <input id="move-input-text" type="text" placeholder="Enter move..."></input>
                                    <input
                                    id="move-input-submit"
                                    type="submit"
                                    name="input-move"
                                    value="Move!"
                                    className="button small small-font"
                                    tooltip-position="top"></input>
                                </form>
                                <div id="manual-input-help-wrapper">
                                    <div
                                    id="manual-input-help"
                                    tooltip-very-large="Moves can be input by specifying the source and target squares, e.g. 'e2e4' (even 'e2 e4'), or 'f6e4'."
                                    tooltip-position="top"
                                    >
                                        <img src="/assets/game/question-mark.png" alt="?"></img>
                                    </div>
                                </div>
                                <div id="toggle-speech-input-wrapper">
                                    <div id="toggle-speech-input" onClick={this.toggleSpeech} tooltip-large="Enable speech input" tooltip-position="left">
                                        <img src="/assets/game/microphone.png" alt="M"></img>
                                    </div>
                                </div>
                            </div>
                            <div id="draw-forfeit-buttons">
                                <button id="draw-button" className="button small small-font">Draw</button>
                                <button id="forfeit-button" className="button small small-font">Forfeit</button>
                            </div>
                            <div id="draw-offer-confirmation" className="confirmation-box">
                                <div id="draw-offer" className="confirmation-content">
                                    <p>Send draw offer?</p>
                                    <div className="button-container">
                                        <button id="send-draw" className="button small small-font">Send</button>
                                        <button id="cancel-draw" className="button small small-font">Cancel</button>
                                    </div>
                                </div>
                            </div>
                            <div id="forfeit-offer-confirmation" className="confirmation-box">
                                <div id="forfeit-confirmation" className="confirmation-content">
                                    <p>Forfeit game?</p>
                                    <div className="button-container">
                                        <button id="send-forfeit" className="button small small-font">Forfeit</button>
                                        <button id="cancel-forfeit" className="button small small-font">Cancel</button>
                                    </div>
                                </div>
                            </div>
                            <div id="draw-received-confirmation" className="confirmation-box">
                                <div id="draw-received" className="confirmation-content">
                                    <p>Your opponent offers you a draw.</p>
                                    <div className="button-container">
                                        <button id="accept-draw" className="button small small-font">Accept</button>
                                        <button id="decline-offer" className="button small small-font">Decline</button>
                                    </div>
                                </div>
                            </div>
                            <div id="spectator-draw-received" className="confirmation-box">
                                <div id="draw-received" className="confirmation-content">
                                    <p>A draw offer has been sent.</p>
                                    <div class="button-container">
                                        <button id="spectator-draw-close" className="button small small-font">Close</button>
                                    </div>
                                </div>
                            </div>
                            <div id="draw-rejection-confirmation" className="confirmation-box">
                                <div id="rejection-confirmation" className="confirmation-content">
                                    <p>The draw offer was rejected.</p>
                                    <div class="button-container">
                                        <button id="close-rejection" className="button small small-font">Close</button>
                                    </div>
                                </div>
                            </div>
                            <div id="opponent-forfeit-confirmation" className="confirmation-box">
                                <div id="opponent-forfeit" className="confirmation-content">
                                    <p>Your opponent forfeits the game.</p>
                                    <div className="button-container">
                                        <button id="close-forfeit" className="button small small-font">Close</button>
                                    </div>
                                </div>
                            </div>
                            <div id="spectator-forfeit-confirmation" className="confirmation-box">
                                <div id="opponent-forfeit" className="confirmation-content">
                                    <p>The game has been forfeited.</p>
                                    <div class="button-container">
                                        <button id="spectator-close-forfeit" className="button small small-font">Close</button>
                                    </div>
                                </div>
                            </div>
                            <div id="notifications">
                                <div id="check" className="notification">You're in check!</div>
                                <div id="game-over" className="notification">
                                    <span></span>
                                    <div id="notification-message"></div>
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
