import React, { Component } from 'react';
import Chessboard from 'chessboardjsx';
import './Play.scss';
import Sidebar from './Sidebar';
import HumanVsHuman from './HumanVsHuman';
import Spinner from '../Spinner';
import { auth } from '../Firebase';

class Play extends Component {

    constructor(props){
        super(props);

        this.state = {
            user: null,
        }
    }

    componentDidMount() {
        document.title = 'Deeper Blue: Play';
        this.initAuthListener();
    }

    initAuthListener(){
        auth.onAuthStateChanged(function(user) {
            if (user) {
                this.setState({user: user.uid});
            } else {
                this.setState({user: 'none'});
            }
        }.bind(this))
    }

    render() {
        return (
            <div>
                {
                    this.state.user ?
                    <div className='game-area'>
                        <HumanVsHuman gameid={this.props.location.pathname.split('/')[2]} userid={this.state.user}>
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
                    </div> :
                    <div>
                        <Spinner />
                    </div>
                }
            </div>
        );
    }
}

export default Play;