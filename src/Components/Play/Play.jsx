import React, { Component } from 'react';
import Chessboard from 'chessboardjsx';
import './Play.scss';
import Sidebar from './Sidebar';
import HumanVsHuman from './HumanVsHuman';
import Spinner from '../Spinner';
import { auth } from '../Firebase';
import $ from 'jquery';
import server from '../Server';

class Play extends Component {

    constructor(props){
        super(props);

        this.state = {
            user: null,
            loaded: false
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
                this.loadGame();
            } else {
                this.setState({user: 'none'});
            }
        }.bind(this))
    }

    resizeBoard = screenWidth => {
        var width = 300;
        if (screenWidth < 600) {
            width = (screenWidth < 500) ? 300 : 0.6*screenWidth;
            $('#game-tab-wrapper').css({'height': 'auto'});
        } else {
            width = (screenWidth < 1000) ? 0.4*screenWidth : 400;
            $('#game-tab-wrapper').css({'height': `${width-45}px`});
        }

        $('#moves-tab-wrapper').css({'height': `${width-45}px`});
        return width;
    }

    loadGame = () => {
        var self = this;

        let objectFlip = obj => {
            const ret = {};
            Object.keys(obj).forEach((key) => { ret[obj[key]] = key; });
            return ret;
        }

        var user = self.state.user;
        var gameID = self.props.location.pathname.split('/')[2]

        server.get(`/getgame/${gameID}`)
            .then(function(response) {
                self.setState({loaded: true});
                var players = response.data.players

                if (Object.values(players).includes(user) || (response.data.creator == user)) {
                    if ((!response.data.public) && (parseInt(response.data.free_slots) > 0)) {
                        alert(`There are open slots in this game! Send your friends the link:\n\nhttps://deeper-blue.me/invite/${self.props.location.pathname.split('/')[2]}\n\n`);
                    }

                    var side = objectFlip(players)[user];
                    self.setState({orientation: (side === 'w') ? 'white' : 'black'});
                } else {
                    self.setState({orientation: 'white'});
                }
            }).catch(function(error) {
                self.setState({orientation: 'white'});
            });
    }

    render() {
        return (
            <div>
                {
                    this.state.user ?
                        this.state.loaded ?
                            <div id="game-wrapper">
                                <div id="side-wrapper">
                                    <span></span>
                                    <div id="side-message"></div>
                                </div>
                                <div id="game-area">
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
                                        orientation={this.state.orientation}
                                        darkSquareStyle={{backgroundColor: 'grey'}}
                                        lightSquareStyle={{backgroundColor: 'lightgrey'}}
                                        />
                                    )}
                                    </HumanVsHuman>
                                    <Sidebar />
                                </div>
                            </div>
                        :
                        <Spinner fullPage={true}/>
                    :
                    <Spinner fullPage={true}/>
                }
            </div>
        )
    }
}

export default Play;