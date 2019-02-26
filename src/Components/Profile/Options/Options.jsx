import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    
    display: flex;
    flex-direction: column;

    border: 2px solid rgb(40, 86, 129);
    border-radius: 15px;
    text-align: center;

`;

class Options extends React.Component {

    constructor(){
        super();

        this.state = { name:'' };
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handlePPChange(event) {
        this.setState({picture: event.target.value});
    }

    handleNameSubmit(e) {
        e.preventDefault();


    }

    handlePPSubmit(e) {
        e.preventDefault();
    }

    render(){
        return(
            <StyledDiv>
                <div className='display_name'>
                    <form onSubmit={this.handleNameSubmit} >
                        <label>
                            Name: <input type='text' value={this.state.value} onChange={this.handleNameChange} />
                        </label>
                        <input type='submit' value='Submit' />
                    </form>
                </div>
                <div className='display_picture'>
                    <form onSubmit='sadf' >
                        <label>
                            Profile Picture: <input type='text' value={this.state.value} onChange={this.handlePPChange} />
                        </label>
                        <input type='submit' value='Submit' />
                    </form>
                </div>
            </StyledDiv>
        );
    }

}

export default Options;