import React, { Component } from 'react';
import './Create.scss'
import { Link } from 'react-router-dom'

class Create extends Component {
      //constructor(props) {
        //super(props);
        // this.state = ;
        //this.handleClick = this.handleClick.bind(this);
      //}

      // handleClick(event) {
      //   alert('Your game will be ' + this.state.value + ' long.');
      //   event.preventDefault();
      // }

      render() {
        return (
          <form id="config_form">
            <br />
            <br />
            <label>
              Player 1 (White):
              <br />
              <select>
                <option value="me">Me, myself and I</option>
                <option value="robot">Deeper Blue</option>
                <option value="human">Another human</option>
              </select>
            </label>
            <br />
            <br />
            <label>
              Player 2 (Black):
              <br />
              <select>
                <option value="me">Me, myself and I</option>
                <option value="robot">Deeper Blue</option>
                <option value="human">Another human</option>
              </select>
            </label>
            <br />
            <br />
            <br />
            <label>
            Game clock:
            </label>
            <br />
            <label>
              <input id = "config_input"
                name="Hours"
                type="number" />
                <br />
                 hours and
            </label>
            <br />
            <label>
              <input id = "config_input"
                name="Minutes"
                type="number"/>
                <br />
                 minutes
            </label>
            <br />
            <br />
            <br />
            <button id="btn_play">
                <Link to='/play' id ="btn">
                  LET'S PLAY!!
                </Link>
            </button>
          </form>
        );
      }
    }

export default Create;
