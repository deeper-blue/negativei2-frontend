import React from 'react';
import { Link } from 'react-router-dom';
import firebase, { auth } from '../../Firebase';
import Spinner from '../../Spinner';
import './Creation.scss'

class Creation extends React.Component {

    constructor() {
        super();

        this.state = {
            name: '',
            picture: '',
            user: null,
            errors: ''
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
                this.setState({user: user});
                
                const db = firebase.firestore();
                var docRef = db.collection('users').doc(this.state.user.uid);

                docRef.get().then(function(doc) {
                    if(doc.exists) {
                        console.log(doc.data, "Redirect");
                        this.props.history.push('/');
                    } else {
                        this.createProfile(user.uid.substring(0,10), 'https://i.imgur.com/TOJtdzW.png', false);
                    }
                }.bind(this))
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

        if(!this.validate(name, picture)){
            this.setState({
                errors: 'Ensure your username is 0-32 characters long and picture is empty or a valid image source.'
            })
            return;
        }
        if(picture === ''){
            this.updateProfile(name, 'https://i.imgur.com/TOJtdzW.png')
        }

        this.updateProfile(name, picture);
    }

    createProfile(name, picture){
        const db = firebase.firestore();
        var profileRef = db.collection('users').doc(this.state.user.uid);

        var profileObj = {}
        if(this.state.user.displayName){
            profileObj['name'] = this.state.user.displayName
        } else {
            profileObj['name'] = name;
        }
        profileObj['pic'] = picture;
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
        var profileRef = db.collection('users').doc(this.state.user.uid);
        var profileObj = {}
        profileObj['name'] = name;
        profileObj['picture'] = picture;
        profileRef.update(profileObj)
            .then(function(){
                console.log('Document updates');
                this.props.history.push('/');
            }.bind(this))
            .catch(function(error) {
                console.error('error updating document', error);
            })
    }

    validate(name, picture) {
        var errors = []
        errors[0] = name.length < 32;
        errors[1] = this.validURL(picture) || picture === '';

        return errors.reduce((total, bool) => total && bool);
    }

    // regular expression test for url
    validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    }
    
    render() {
        return(
            <div>
                {
                    this.state.user
                ?
                    <div id="creation">
                        <div>
                            Please enter your details below to create your profile. <br/>
                            You can skip this step and change these details later from the profile page.
                        </div>
                        <div>
                            <div id='errors'>
                                {this.state.errors}
                            </div>
                            <div className='inputs'>
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
                            </div>
                            <div>
                                <button onClick={this.handleProfileSubmit} className='button submission'>
                                    submit
                                </button>
                                <Link to='/'>
                                    skip this step
                                </Link>
                            </div>
                        </div>
                    </div>
                :
                    <Spinner fullPage={true}/>
                }
            </div>
        )
    }
}

export default Creation;