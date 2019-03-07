import React, { Component } from 'react';
import Chessboard from 'chessboardjsx';
import './Play.scss';
import Sidebar from './Sidebar';
import HumanVsHuman from './HumanVsHuman';
import Spinner from '../Spinner';
import { auth } from '../Firebase';
import $ from 'jquery';

class Play extends Component {

    constructor(props){
        super(props);

        this.state = {
            user: null,
        }
    }

    componentDidMount() {
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

    resizeBoard = screenWidth => {
        var width = 300;
        if (screenWidth < 600) {
            if (screenWidth < 500) {
                width = 300;
            } else {
                width = 0.6 * screenWidth;
            }

            $('#game-tab-wrapper').css({
                'height': 'auto'
            });
        } else {
            if (screenWidth < 1000) {
                width = 0.4 * screenWidth;
            } else {
                width = 400;
            }

            $('#game-tab-wrapper').css({
                'height': `${width-45}px`
            });
        }

        $('#moves-tab-wrapper').css({
            'height': `${width-45}px`
        });

        return width;
    }

    render() {
        return (
            <div>
                {
                    this.state.user ?
                    <div className='game-area'>
                        <HumanVsHuman
                        gameid={this.props.location.pathname.split('/')[2]}
                        userid={this.state.user}
                        >
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
                            calcWidth={({ screenWidth, screenHeight }) => this.resizeBoard(screenWidth)}
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