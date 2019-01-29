import React, { Component } from 'react';
import Chessboard from 'chessboardjsx';

class Game extends Component {
    render() {
        return (
            <div>
                <Chessboard position="start"/>
            </div>
        );
    }
}

export default Game;