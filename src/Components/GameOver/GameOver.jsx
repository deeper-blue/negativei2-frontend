import React from 'react';
import Spinner from '../Spinner';
import Chessboard from 'chessboardjsx';
import './GameOver.scss';
import { auth } from '../Firebase';
import server from '../Server';

class GameOver extends React.Component {
  state = {
      game: null,
      user: null,
      rematch: null,
      black: null,
      white: null
  };


  componentDidMount() {
      this.initAuthListener();

      var id = this.props.location.pathname.split('/')[2];
      this.loadGame(id);
  }

  initAuthListener(){
      auth.onAuthStateChanged(function (user) {
          if (user) {
              this.setState({user: user.uid});
          } else {
              this.setState({user: 'none'});
          }
      }.bind(this));
  }

  loadGame = (id) => {
    server.get(`/getgame/${id}`)
      .then(function (response) {
        this.setState({game: response.data}, () => this.getResult());
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }

  rematch = () => {
      var formData = new FormData();

      formData.set('creator_id', this.state.user);
      formData.set('player1_id', this.state.game.players.b);
      formData.set('player2_id',this.state.game.players.w);
      formData.set('board_id', 'kevin');
      formData.set('time_per_player', this.state.game.time_controls);
      formData.set('public', this.state.game.public);

      server.post('/creategame', formData)
          .then(function (response) {
              this.setState({rematch: response.data.id})
              this.props.history.push('/play/' + response.data.id);
          }.bind(this))
          .catch(function (error) {
              console.log(error);
          })

  }

  getResult = () => {
    if (this.state.game.result === '1-0') {
      this.setState({white: 'Win', black: 'Lose'});
    } else if (this.state.game.result === '0-1') {
      this.setState({white: 'Lose', black: 'Win'});
    } else if (this.state.game.result === '1/2-1/2') {
      this.setState({white: 'Draw', black: 'Draw'});
    } else {
      this.setState({white: 'In progress', black: 'In progress'});
    }
  }

  render() {
    return (
      <div>
        {
          this.state.game ?
          <div id="game-over-wrapper">
            <button onClick={this.rematch} className="button large large-font" id="rematch-btn">Rematch</button>

            <Chessboard id="board" position={this.state.game.fen} width="275"/>

            <div id="analyse">
              <div id="analyse-description">
                <p><em>You may move pieces on the board to analyse different positions.</em></p>
              </div>
              <button onClick={() => window.location.reload()} className="button small small-font" id="reset-btn">Reset</button>
            </div>

            <table id="results">
              <thead>
                <tr>
                    <th>Player ID</th>
                    <th>Playing as</th>
                    <th>Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.game.players.b}</td>
                  <td>Black</td>
                  <td>{this.state.black}</td>
                </tr>
                <tr>
                  <td>{this.state.game.players.w}</td>
                  <td>White</td>
                  <td>{this.state.white}</td>
                </tr>
              </tbody>
            </table>
          </div>
          :
          <Spinner/>
        }
      </div>
    );
  }
}


export default GameOver;
