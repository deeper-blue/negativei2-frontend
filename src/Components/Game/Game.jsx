import React, { Component } from 'react';
import Chessboard from 'chessboardjsx';
import './Game.scss'
import Sidebar from './Sidebar'

class Game extends Component {
    render() {
        const calcWidth = ({ screenWidth, screenHeight }) => (screenWidth || screenHeight) < 550 ? 300 : 500;

        return (
            <div className="game-area">
                <Chessboard
                    position="start"
                    calcWidth={calcWidth}
                />
                <Sidebar />
            </div>
        );
    }
}

export default Game;