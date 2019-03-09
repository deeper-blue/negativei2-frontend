// eslint-disable-next-line
import React, { Component } from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import Chess from 'chess.js';
import axios from 'axios';
import opensocket from 'socket.io-client';

class HumanVsHuman extends Component {
    static propTypes = { children: PropTypes.func };

    state = {
        fen: 'start',
        // square styles for active drop squares
        dropSquareStyle: {},
        // custom square styles
        squareStyles: {},
        // square with the currently clicked piece
        pieceSquare: '',
        // currently clicked square
        square: '',
        history: []
    };

    componentDidMount() {
        this.game = new Chess();
        this.socket = opensocket('https://negativei2-server.herokuapp.com');

        /** Loads the game from the server and updates:
         * - The current internal game representation (this.game)
         * - The move tracker (loads all of the moves from the server)
         * - The turn indicator (according to the server)
         */
        this.loadGame();
    }

    /** Handles move-making with click-and-drop or drag-and-drop.
     * @param {boolean} dragged - Whether the move was a drag and drop (if false, then click and drop)
     * @param clickedSquare - The clicked square (if the move was click and drop, otherwise, undefined)
     * @param sourceSquare - The source square (if the move was drag and drop, otherwise, undefined)
     * @param targetSquare - The target square (if the move was drag and drop, otherwise, undefined)
     */
    handleMove = (dragged, clickedSquare, sourceSquare, targetSquare) => {
        var self = this;

        // Create move data
        var moveData = {
            from: (dragged ? sourceSquare : this.state.pieceSquare),
            to: (dragged ? targetSquare : clickedSquare),
            promotion: 'q' // Always promote to a queen for simplicity
        }

        // Test the move on a cloned game object to check that it's fine
        var clone = new Chess(this.game.fen());
        var move = clone.move(moveData);

        /* Illegal move */
        if (move === null) return;

        /* Legal move */

        // Construct a HTTP POST query
        var query = new FormData();
        query.set('game_id', this.props.gameid);
        query.set('move', move.san);
        query.set('user_id', this.props.userid);

        // Send the POST request to the server
        axios.post('https://negativei2-server.herokuapp.com/makemove', query)
            .then(function(response) {
                // Update the state
                if (dragged) { // Drag and drop
                    self.setState(({ history, pieceSquare }) => ({
                        fen: self.game.fen(),
                        history: self.game.history({ verbose: true }),
                        squareStyles: squareStyling({ pieceSquare, history })
                    }));
                } else { // Click and drop
                    self.setState({
                        fen: self.game.fen(),
                        history: self.game.history({ verbose: true }),
                        pieceSquare: ''
                    });
                }
            })
            .catch(function(error) {
                var tmp = $('<div></div>');
                tmp.html(error.response.data);

                var message = $('p', tmp).text();
                console.log(message);
            });
    };

    /** Loads the game for the first time (synchronises client's board with server's internal board) */
    loadGame = () => {
        // Send the GET request to the server
        var self = this;
        axios.get(`https://negativei2-server.herokuapp.com/getgame/${self.props.gameid}`)
            .then(function(response) {
                var fen = response.data.fen;
                self.game.load(fen);
                self.setState({fen: fen});
                self.updateTurnIndicator(response.data.turn);
                self.loadMoveTracker(response.data.history);
                // register for updates
                self.socket.emit('register', response.data.id);
                self.socket.on('move', self.updateGameState);
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    /** Updates the game (synchronises client's board with server's internal board) */
    updateGame = () => {
        // Send the GET request to the server
        var self = this;
        axios.get(`https://negativei2-server.herokuapp.com/getgame/${self.props.gameid}`)
            .then(function(response) {
                self.updateGameState(response.data);
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    /** Helper function to set the game state */
    updateGameState = (gameState) => {
        console.log(`Updating game state {gameState}`);
        var fen = gameState.fen;
        this.game.load(fen);
        this.updateTurnIndicator(gameState.turn);
        let move = gameState.history[gameState.history.length-1];
        this.updateMoveTracker(move.move_count, move.side, move.san);
        this.setState({fen: fen});
    }

    /** Updates the move turn color indicator.
     * @param side - The color representing the current side to play.
     */
    updateTurnIndicator = side => {
        let turnIcon = $("#turn-icon")
        if (side === "b") {
            turnIcon.css({
                "background-color": "black",
                "color":            "white",
                "border-color":     "grey"
            });
            turnIcon.text("Black");
        } else if (side === "w") {
            turnIcon.css({"background-color": "white",
                "color": "black",
                "border-color": "lightgrey"
            });
            turnIcon.text("White");
        }
    }

    /** Loads all of the moves in an array (from the server) into the move tracker.
     * @param {Array} history - The history of moves played in the game.
     */
    loadMoveTracker = history => {
        history.forEach(function(move) {
            if (move.side === "w") {
                $('<tr>',{
                    'id' : `moves-${move.move_count}`,
                    'html': $('<td>', {
                        'id': `move-${move.move_count}`
                    }).html(move.move_count).add($('<td>', {
                        'id': `move-${move.move_count}-w`
                    }).html(move.san).add($('<td>', {
                        'id': `move-${move.move_count}-b`
                    })))
                }).appendTo('#move-tracker tbody');
            } else if (move.side === "b") {
                $(`#move-${move.move_count}-b`).html(move.san);
            }
        });
    }

    /** Updates the move turn tracker with a single move.
     * @param number - The move number of the move that was just made.
     * @param side - The color representing the current side to play.
     * @param san - The move in SAN.
     */
    updateMoveTracker = (number, side, san) => {
        if (side === "w") {
            $('<tr>',{
                'id' : `moves-${number}`,
                'html': $('<td>', {
                    'id': `move-${number}`
                }).html(number).add($('<td>', {
                    'id': `move-${number}-w`
                }).html(san).add($('<td>', {
                    'id': `move-${number}-b`
                })))
            }).appendTo('#move-tracker tbody');
        } else if (side === "b") {
            $(`#move-${number}-b`).html(san);
        }
    }

    // keep clicked square style and remove hint squares
    removeHighlightSquare = () => {
        this.setState(({ pieceSquare, history }) => ({
            squareStyles: squareStyling({ pieceSquare, history })
        }));
    };

    // show possible moves
    highlightSquare = (sourceSquare, squaresToHighlight) => {
        const highlightStyles = [...squaresToHighlight].reduce(
            (a, c) => {
                return {
                    ...a,
                    ...{
                        [c]: {
                            background: 'radial-gradient(circle, #72c2e0 25%, transparent 40%)',
                            borderRadius: '50%'
                        }
                    },
                    ...squareStyling({
                        history: this.state.history,
                        pieceSquare: this.state.pieceSquare
                    })
                };
            },
            {}
        );

        this.setState(({ squareStyles }) => ({
            squareStyles: { ...squareStyles, ...highlightStyles }
        }));
    };

    // Drag and drop move
    onDrop = ({ sourceSquare, targetSquare }) => this.handleMove(true, undefined, sourceSquare, targetSquare);

    onMouseOverSquare = square => {
        // get list of possible moves for this square
        let moves = this.game.moves({
            square: square,
            verbose: true
        });

        // exit if there are no moves available for this square
        if (moves.length === 0) return;

        let squaresToHighlight = [];
        for (var i = 0; i < moves.length; i++) {
            squaresToHighlight.push(moves[i].to);
        }

        this.highlightSquare(square, squaresToHighlight);
    };

    onMouseOutSquare = square => this.removeHighlightSquare(square);

    // central squares get diff dropSquareStyles
    onDragOverSquare = square => {
        this.setState({
            dropSquareStyle:
            square === 'e4' || square === 'd4' || square === 'e5' || square === 'd5'
                ? { backgroundColor: 'cornFlowerBlue' }
                : { boxShadow: 'inset 0 0 1px 4px rgb(255, 255, 0)' }
        });
    };

    // Click and drop move
    onSquareClick = square => {
        this.setState(({ history }) => ({
            squareStyles: squareStyling({ pieceSquare: square, history }),
            pieceSquare: square
        }));

        this.handleMove(false, square, undefined, undefined)
    };

    onSquareRightClick = square => {
        this.setState({
            squareStyles: { [square]: { backgroundColor: 'deepPink' } }
        });
    }

    render() {
        const { fen, dropSquareStyle, squareStyles } = this.state;

        return this.props.children({
            squareStyles,
            position: fen,
            onMouseOverSquare: this.onMouseOverSquare,
            onMouseOutSquare: this.onMouseOutSquare,
            onDrop: this.onDrop,
            dropSquareStyle,
            onDragOverSquare: this.onDragOverSquare,
            onSquareClick: this.onSquareClick,
            onSquareRightClick: this.onSquareRightClick
        });
    }
}

export default HumanVsHuman;

const squareStyling = ({ pieceSquare, history }) => {
    const sourceSquare = history.length && history[history.length - 1].from;
    const targetSquare = history.length && history[history.length - 1].to;

    return {
        [pieceSquare]: { backgroundColor: 'rgba(0, 159, 252, 0.4)' },
        ...(history.length && {
            [sourceSquare]: {
                backgroundColor: 'rgba(0, 159, 252, 0.4)'
            }
        }),
        ...(history.length && {
            [targetSquare]: {
                backgroundColor: 'rgba(0, 159, 252, 0.4)'
            }
        })
    };
};
