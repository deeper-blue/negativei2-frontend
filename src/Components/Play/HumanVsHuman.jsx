// eslint-disable-next-line
import React, { Component } from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import Chess from 'chess.js';
import axios from 'axios';

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
        var fen = this.updateGame();
        this.game = new Chess(fen);
        console.log(this.game.fen());
    }

    /** Handles move-making with click-and-drop or drag-and-drop.
     * @param {boolean} dragged - Whether the move was a drag and drop (if false, then click and drop)
     * @param clickedSquare - The clicked square (if the move was click and drop, otherwise, undefined)
     * @param sourceSquare - The source square (if the move was drag and drop, otherwise, undefined)
     * @param targetSquare - The target square (if the move was drag and drop, otherwise, undefined)
     */
    handleMove = (dragged, clickedSquare, sourceSquare, targetSquare) => {
        /** @todo Update this.state.fen with the FEN string from /getgame - this should be done before anything else. */

        // Create move object
        var moveData = {
            from: (dragged ? sourceSquare : this.state.pieceSquare),
            to: (dragged ? targetSquare : clickedSquare),
            promotion: 'q' // Always promote to a queen for simplicity
        }

        var move = this.game.move(moveData);

        /* Illegal move */
        if (move === null) return;

        var san = move.san;

        /* Legal move */
        // Undo the move
        this.game.undo();

        // Construct a HTTP POST query
        var query = new FormData();
        query.set('game_id', this.props.gameid);
        query.set('move', san);
        query.set('user_id', this.props.userid);

        // Send the POST request to the server
        axios.post('http://negativei2-server.herokuapp.com/makemove', query)
            .then(function(response) {
                console.log(response);

                // Re-make the move
                var move = this.game.move(moveData);

                // Update the turn indicator
                this.updateTurnIndicator(move);

                // Adding the move to the move tracker
                let history = this.game.history();
                let moveNumber = Math.ceil(history.length/2.0);

                // Update move counter
                this.updateMoveCounter(move, moveNumber);

                // Update the state
                if (dragged) { // Drag and drop
                    this.setState(({ history, pieceSquare }) => ({
                        fen: this.game.fen(),
                        history: this.game.history({ verbose: true }),
                        squareStyles: squareStyling({ pieceSquare, history })
                    }));
                } else { // Click and drop
                    this.setState({
                        fen: this.game.fen(),
                        history: this.game.history({ verbose: true }),
                        pieceSquare: ''
                    });
                }
            })
            .catch(function(error) {
                var tmp = $('<div></div>');
                tmp.html(error.response.data);

                var message = $('p', tmp).text();

                if (message.includes('_schema')) {// If schema error:
                    message = message.replace(/'_schema'/,'"_schema"');
                    var json = JSON.parse(message);
                    console.log(json['_schema']);
                } else {// Other errors (500 etc.)
                    console.log(message);
                }
            });
    };

    updateGame = () => {
        // Send the GET request to the server
        var self = this;
        axios.get(`http://negativei2-server.herokuapp.com/getgame/${self.props.gameid}`)
            .then(function(response) {
                var fen = response.data.fen;
                self.setState({fen: response.data.fen});
                return fen;
            })
            .catch(function(error) {
                console.log(error);
                return self.game.fen();
            });
    }

    /** Updates the move turn color indicator.
     * @param move - The move object representing the move that was just made.
     */
    updateTurnIndicator = move => {
        let turnIcon = $("#turn-icon")
        if (move.color === "w") {
            turnIcon.css({
                "background-color": "black",
                "color":            "white",
                "border-color":     "grey"
            });
            turnIcon.text("Black");
        } else if (move.color === "b") {
            turnIcon.css({"background-color": "white",
                "color": "black",
                "border-color": "lightgrey"
            });
            turnIcon.text("White");
        }
    }

    /** Updates the move turn tracker.
     * @param move - The move object representing the move that was just made.
     * @param number - The move number of the move that was just made.
     */
    updateMoveTracker = (move, number) => {
        if (move.color === "w") {
            $('<tr>',{
                'id' : `moves-${number}`,
                'html': $('<td>', {
                    'id': `move-${number}`
                }).html(number).add($('<td>', {
                    'id': `move-${number}-w`
                }).html(move.san).add($('<td>', {
                    'id': `move-${number}-b`
                })))
            }).appendTo('#move-tracker tbody');
        } else if (move.color === "b") {
            $(`#move-${number}-b`).html(move.san);
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