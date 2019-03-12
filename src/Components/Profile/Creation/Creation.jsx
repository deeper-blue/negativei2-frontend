import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;

    input {
        width: max-content;
    }
`;

class Creation extends React.Component {

    constructor() {
        super();

        this.state = {
            name: '',
            picture: ''
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePPChange = this.handlePPChange.bind(this);
        this.handleProfileSubmit = this.handleProfileSubmit.bind(this);
    }

    handleNameChange(event){
        this.setState({name: event.target.value});
    }

    handlePPChange(event) {
        this.setState({picture: event.target.value});
    }

    handleProfileSubmit(){

    }

    render() {
        return(
            <StyledDiv>
                <div className='display_name'>
                    <form onSubmit={this.handleNameSubmit} >
                        <label>
                            Name: <input type='text' value={this.state.name} onChange={this.handleNameChange} />
                        </label>
                        <input type='submit' value='Submit' />
                    </form>
                </div>
                <div className='display_picture'>
                    <form onSubmit={this.handlePPSubmit} >
                        <label>
                                Profile Picture: <input type='text' value={this.state.picture} onChange={this.handlePPChange} />
                        </label>
                        <input type='submit' value='Submit' />
                    </form>
                </div>
            </StyledDiv>
        )
    }
}

export default Creation;