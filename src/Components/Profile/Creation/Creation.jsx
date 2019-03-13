import React from 'react';
import firebase, { auth } from '../../Firebase';
import Spinner from '../../Spinner';
import './Creation.scss'

class Creation extends React.Component {

    constructor() {
        super();

        this.state = {
            name: '',
            picture: '',
            user: null
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePPChange = this.handlePPChange.bind(this);
        this.handleProfileSubmit = this.handleProfileSubmit.bind(this);
    }

    componentDidMount() {
        this.initAuthListener();
    }

    initAuthListener(){
        auth.onAuthStateChanged(function (user) {
            if (user) {
                this.setState({user: user.uid});
                this.createProfile(user.uid.substring(0,10), 'https://i.imgur.com/TOJtdzW.png', false);
            } else {
                this.setState({user: 'none'});
            }
        }.bind(this));
    }

    handleNameChange(event){
        this.setState({name: event.target.value});
    }

    handlePPChange(event) {
        this.setState({picture: event.target.value});
    }

    handleProfileSubmit(e){
        e.preventDefault();

        var name = this.state.name;
        var picture = this.state.picture;

        if(!name || !picture){
            return;
        }

        this.updateProfile(name, picture, true);
    }

    createProfile(name, picture){
        const db = firebase.firestore();
        var profileRef = db.collection('users').doc(this.state.user);

        var profileObj = {}
        profileObj['name'] = name;
        profileObj['pic'] = picture;
        console.log(profileObj);
        profileRef.set(profileObj)
            .then(function(){
                console.log('Document updated');
            })
            .catch(function(error) {
                console.error('error creating document ', error);
            });
    }

    updateProfile(name, picture){
        const db = firebase.firestore();
        var profileRef = db.collection('users').doc(this.state.user);

        var profileObj = {}
        profileObj['name'] = name;
        profileObj['pic'] = picture;

        profileRef.update(profileObj)
            .then(function(){
                console.log('Document updates');
                this.props.history.push('/');
            })
            .catch(function(error) {
                console.error('error updating document', error);
            })
    }

    render() {
        return(
            <div>
                {
                    this.state.user
                ?
                    <div id="creation">
                        <form onSubmit={this.handleProfileSubmit} >
                            <div className='display_name'>
                                <label>
                                    Name: <input type='text' value={this.state.name} onChange={this.handleNameChange} />
                                </label>
                            </div>
                            <div className='display_picture'>
                                <label>
                                    Profile Picture: <input type='text' value={this.state.picture} onChange={this.handlePPChange} />
                                </label>
                            </div>
                            <input type='submit' value='Submit' />
                        </form>
                    </div>
                :
                    <Spinner fullPage={true}/>
                }
            </div>
        )
    }
}

export default Creation;