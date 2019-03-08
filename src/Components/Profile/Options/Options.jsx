import React from 'react';
import styled from 'styled-components';
import firebase from '../../Firebase';

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
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNameSubmit = this.handleNameSubmit.bind(this);
        this.handlePPChange = this.handlePPChange.bind(this);
        this.handlePPSubmit = this.handlePPSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handlePPChange(event) {
        this.setState({picture: event.target.value});
    }

    handleNameSubmit(e) {
        e.preventDefault();

        const name = this.state.name;

        this.updateProfile('name', name);
    }

    handlePPSubmit(e) {
        e.preventDefault();

        const picture = this.state.picture;

        this.updateProfile('pic', picture);
    }

    updateProfile(field, value) {
        const db = firebase.firestore();
        var profileRef = db.collection('users').doc(this.props.profileID);

        var my_obj = {}
        my_obj[field] = value;
        profileRef.update(
            my_obj
        )
        .then(function() {
            console.log('Document Updated');
            window.location.reload();
        })
        .catch(function(error) {
            console.error('error updating document', error);
        });

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
                    <form onSubmit={this.handlePPSubmit} >
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