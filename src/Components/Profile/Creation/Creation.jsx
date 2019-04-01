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
                
                const db = firebase.firestore();
                var docRef = db.collection('users').doc(this.state.user);

                docRef.get().then(function(doc) {
                    if(doc.exists) {
                        console.logt(doc.data);
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
            }.bind(this))
            .catch(function(error) {
                console.error('error updating document', error);
            })
    }

    render() {
        return(
            <divdiv>
                {
                    this.state.user
                ?
                    <div id="creation">
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
                        <div>
                            <button onClick={this.handleProfileSubmit} className='button'>
                                submit
                            </button>
                            <Link to='/' className='button'>
                                skip this step
                            </Link>
                        </div>
                    </div>
                :
                    <Spinner fullPage={true}/>
                }
            </divdiv>
        )
    }
}

export default Creation;