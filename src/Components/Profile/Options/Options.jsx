import React from 'react';
import styled from 'styled-components';
import firebase from '../../Firebase';

const StyledDiv = styled.div`
    
    display: flex;
    flex-direction: column;

    border: 2px solid rgb(40, 86, 129);
    border-radius: 15px;
    text-align: center;

    #errorz {
        font-size: 13px;
        color: red;
    }
`;

class Options extends React.Component {

    constructor(){
        super();

        this.state = { name:'', picture: '' };
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
        if(this.validateName(name)){
            this.updateProfile('name', name);
        } else {
            this.setState({
                nameError: "Please enter a name of 32 characters or less."
            })
        }
    }

    handlePPSubmit(e) {
        e.preventDefault();

        const picture = this.state.picture;
        if(this.validatePicture(picture)){
            this.updateProfile('pic', picture);
        } else {
            this.setState({
                pictureError: "Please enter a valid url for an image."
            })
        }
    }

    validateName(name){
        return name.length < 32;
    }

    validatePicture(picture){
        return this.validURL(picture);
    }

    validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
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
                <div>
                    Use these forms to alter your display name and profile picture.
                </div>
                <div id='errorz'>
                    {this.state.nameError}
                </div>
                <div id='errorz'>
                    {this.state.pictureError}
                </div>
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
        );
    }

}

export default Options;