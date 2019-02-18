import React, { Component } from 'react';
import './Create.scss'
import { Link } from 'react-router-dom'
import ReactDOM from "react-dom";


function validate(hours, minutes, P1, P2 ) {
  const errors = [];

  if (hours.length === 0) {
    errors.push("Hours can't be empty");
  }

  if (minutes.length === 0) {
    errors.push("Minutes can't be empty");
  }

  if (minutes == 0 && hours == 0) {
    errors.push("You cannot play for 0 seconds and 0 hours");
  }

  if (P1 == "me" && P2 == "me"){
    errors.push("You cannot play against yourself!");
  }

  return errors;
}

class Create extends React.Component {
  constructor() {
    super();
    this.state = {
      hours: "",
      minutes: "",
      P1: "me",
      P2: "me",

      errors: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { hours, minutes, P1, P2 } = this.state;

    const errors = validate(hours, minutes, P1, P2);
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }

    // submit the data...
  }

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        {errors.map(error => (
          <p key={error}>Error: {error}</p>
        ))}
        <label>
          Player 1 (White):
          <br />
          <select
          value={this.state.P1}
          onChange={evt => this.setState({ P1: evt.target.value })}>>
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
          <select
          value={this.state.P2}
          onChange={evt => this.setState({ P2: evt.target.value })}>
            <option value="me">Me, myself and I</option>
            <option value="robot">Deeper Blue</option>
            <option value="human">Another human</option>
          </select>
        </label>
        <br />
        <br />
        <input
          value={this.state.hours}
          onChange={evt => this.setState({ hours: evt.target.value })}
          type="number"
          placeholder="Hours"
          min = "0"
          max = "2"
        />
        <br />
        <br />
        <input
          value={this.state.minutes}
          onChange={evt => this.setState({ minutes: evt.target.value })}
          type="number"
          placeholder="Minutes"
          min = "0"
          max = "59"
        />

        <button type="submit">Submit</button>
      </form>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Create />, rootElement);
export default Create;

export default Create;
