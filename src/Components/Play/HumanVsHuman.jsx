// eslint-disable-next-line
import React, { Component } from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import Chess from 'chess.js';

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
    }

    // keep clicked square style and remove hint squares
    removeHighlightSquare = () => {
        this.setState(({ pieceSquare, history }) => ({
            squareStyles: squareStyling({ pieceSquare, history })
        }));
    };

    // show possible moves
    highlightSquare = (sourceSquare, squaresToHighlight) => {
        // Highlight current square?
        //const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
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

    onDrop = ({ sourceSquare, targetSquare }) => {
        // see if the move is legal
        let move = this.game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q' // always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null) return;

        // legal move
        this.setState(({ history, pieceSquare }) => ({
            fen: this.game.fen(),
            history: this.game.history({ verbose: true }),
            squareStyles: squareStyling({ pieceSquare, history })
        }));

        // Changing the turn indicator
        let turnIcon = $("#turn-icon")
        if (move.color === "w") {
            turnIcon.css({
                "background-color": "black",
                "color":            "white",
                "border-color":     "grey"
            });
            turnIcon.text("Black");
        } else if (move.color === "b") {
            turnIcon.css({
                "background-color": "white",
                "color": "black",
                "border-color": "lightgrey"
            });
            turnIcon.text("White");
        }

        // Adding the move to the move tracker
        let history = this.game.history();
        let moveNumber = Math.ceil(history.length/2.0);

        if (move.color === "w") {
            $('<tr>',{
                'id' : `moves-${moveNumber}`,
                'html': $('<td>', {
                    'id': `move-${moveNumber}`
                }).html(moveNumber).add($('<td>', {
                    'id': `move-${moveNumber}-w`
                }).html(move.san).add($('<td>', {
                    'id': `move-${moveNumber}-b`
                })))
            }).appendTo('#move-tracker tbody');
        } else if (move.color === "b") {
            $(`#move-${moveNumber}-b`).html(move.san);
        }
    };

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

    onSquareClick = square => {
        this.setState(({ history }) => ({
            squareStyles: squareStyling({ pieceSquare: square, history }),
            pieceSquare: square
        }));

        let move = this.game.move({
            from: this.state.pieceSquare,
            to: square,
            promotion: 'q' // always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null) return;

        this.setState({
            fen: this.game.fen(),
            history: this.game.history({ verbose: true }),
            pieceSquare: ''
        });
    };

    onSquareRightClick = square =>
        this.setState({
            squareStyles: { [square]: { backgroundColor: 'deepPink' } }
        });

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