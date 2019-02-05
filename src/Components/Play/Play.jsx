import React, { Component } from 'react';
import Chessboard from 'chessboardjsx';
import './Play.scss';
import Sidebar from './Sidebar';
import HumanVsHuman from './HumanVsHuman';

class Play extends Component {
    render() {
        return (
            <div className="game-area">
                <HumanVsHuman>
                {({
                    position,
                    onDrop,
                    onMouseOverSquare,
                    onMouseOutSquare,
                    squareStyles,
                    dropSquareStyle,
                    onDragOverSquare,
                    onSquareClick,
                    onSquareRightClick
                }) => (
                    <Chessboard
                    id="humanVsHuman"
                    calcWidth={({ screenWidth, screenHeight }) => (screenWidth || screenHeight) < 550 ? 300 : 500}
                    position={position}
                    onDrop={onDrop}
                    onMouseOverSquare={onMouseOverSquare}
                    onMouseOutSquare={onMouseOutSquare}
                    boardStyle={{
                        borderRadius: '5px',
                        boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
                    }}
                    squareStyles={squareStyles}
                    dropSquareStyle={dropSquareStyle}
                    onDragOverSquare={onDragOverSquare}
                    onSquareClick={onSquareClick}
                    onSquareRightClick={onSquareRightClick}
                    darkSquareStyle={{backgroundColor: 'grey'}}
                    lightSquareStyle={{backgroundColor: 'lightgrey'}}
                    />
                )}
                </HumanVsHuman>
                <Sidebar />
            </div>
        );
    }
}

export default Play;