import React from 'react';
import axios from 'axios';
import './GameEnd.scss';
import { auth } from '../Firebase';
import { Link } from 'react-router-dom';

class GameEnd extends React.Component {
  constructor() {
      super();
      this.state = {
          hours: ""
      };
  }

  componentDidMount() {
      this.initAuthListener();
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

  getInfo(){
    axios.get('https://negativei2-server.herokuapp.com/creategame')
        .then(function (response) {
            console.log(response);
            console.log('/play/' + response.data.id);
            this.props.history.push('/play/' + response.data.id);
            this.setState({player1: response.data.players.b})
            this.setStste({player2: response.data.players.w})
            this.setState({time: response.data.time_controls})
            this.setState({result: response.data.result})
            this.setStste({timeSet: response.data.time_controls})
            this.setState({timeRemain1: response.data.remaining_time.b})
            this.setState({timeRemain2: response.data.remaining_time.w})
        }.bind(this))
        .catch(function (error) {
            console.log(error);
        })
  }

  createGame() {
      var formData = new FormData();
      // var time = (this.state.hours * 3600) + (this.state.minutes * 60);
      // var player1;
      // var player2;

      // this.state.P1 === 'me' ? player1 = this.state.user : player1 = this.state.P1;
      // this.state.P2 === 'me' ? player2 = this.state.user : player2 = this.state.P2;

      formData.set('creator_id', this.state.user);
      formData.set('player1_id', this.state.player1);
      formData.set('player2_id',this.state.player2);
      formData.set('board_id', 'kevin');
      formData.set('time_per_player', this.state.time);

      axios.post('https://negativei2-server.herokuapp.com/creategame', formData)
          .then(function (response) {
              console.log(response);
              console.log('/play/' + response.data.id);
              this.props.history.push('/play/' + response.data.id);
              var player1 = response.dat
          }.bind(this))
          .catch(function (error) {
              console.log(error);
          })

  }


  handleSubmit(e) {
      e.preventDefault();

      // const { hours, minutes, P1, P2 } = this.state;
      // this.setState({ errors: [] });
      // const errors = validate(hours, minutes, P1, P2);
      // if (errors.length > 0) {
      //     this.setState({ errors });
      //     return;
      // } else {
          this.createGame();
    //  }
  }

  generate_table() {
    // get the reference for the body
    var body = document.getElementsByTagName("body")[0];
  //  var body2 = document.getElementsByTagName("body")[0];

    // creates a <table> element and a <tbody> element
    var tbl1 = document.createElement("table1");
  //  var tbl2 = document.createElement("table2")
    var tblBody1 = document.createElement("tbody1");
  //  var tblBody2 = document.createElement("tbody2")

    // creating all cells
    //for (var i = 0; i < 1; i++) {
      // creates a table row
      var row1 = document.createElement("tr1");
      // var row2 = document.createElement("tr2")

      //for (var j = 0; j < 2; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        var cell1 = document.createElement("td1");
        // var cell2 = document.createElement("td2");
        var cellText1 = document.createTextNode("***************** Player1: " + this.state.player1 + "| Result: " + this.state.result + "| Duration: " + (this.state.timeSet - this.state.timeRemain1));
        var cellText2 = document.createTextNode("***************** Player2: " + this.state.player2 + "| Result: " + this.state.result + "| Duration: " + (this.state.timeSet - this.state.timeRemain2));
        cell1.appendChild(cellText1);
        cell1.appendChild(cellText2);
        row1.appendChild(cell1);
        // row2.appendChild(cell2);
      //  row1.appendChild(cell2);
        // cell2.appendChild(cellText2);
        // row2.appendChild(cell2)
    //  }

      // add the row to the end of the table body
      tblBody1.appendChild(row1);
      // tblBody1.appendChild(row2);
    //  tblBody2.appendChild(row2);

    //}

    // put the <tbody> in the <table>
    tbl1.appendChild(tblBody1);
    // appends <table> into <body>
    body.appendChild(tbl1);
  //  body2.appendChild(tbl2);
    // sets the border attribute of tbl to 2;
    tbl1.setAttribute("border", "20");
  //  tbl2.setAttribute("border", "2");
  }


  render() {
      const { errors } = this.state;
      return (
          <div class="btn-group-links" id="my_centered_buttons">
            <Link to='/create' className="button large large-font home-link">
                Create game
            </Link>
            <Link to='/join' className="button large large-font home-link">
                Join game
            </Link>
            <Link to='/profile' className="button large large-font home-link">
                Profile
            </Link>
            <Link to='/boardAnalyse' className="button large large-font home-link">
                Board Analyse
            </Link>

              <button onClick={() => this.getInfo(), this.createGame()} className="button large large-font home-link">Rematch</button>
          </div>

      );
  }
}


export default GameEnd;
