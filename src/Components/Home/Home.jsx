import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import firebase, { auth } from '../Firebase';
import Spinner from '../Spinner';
import './Home.scss';

class Home extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            user: null,
            anon: null
        }
    }

    componentDidMount(){
        this.initAuthListener();
    }

    initAuthListener(){
        auth.onAuthStateChanged(function (user) {
            if (user) {
                this.setState({
                    user: user.uid,
                    anon: user.isAnonymous,
                    exists: null,
                });
            } else {
                this.setState({user: 'none'});
            }
        }.bind(this));
    }

    getProfileInfo() {
        const db = firebase.firestore();
        const docRef = db.collection('users').doc(this.state.user);

        docRef.get().then(function(doc) {
            if(doc.exists){
                console.log('hyuck');
                this.setState({
                    exists: true
                })
            } else {
                console.log('hyick');
                this.setState({
                    exists: false
                })
            }
        }.bind(this))
    }

    homePage(){
        return(
            <div className='home-links'>
                <Link to='/create' className="button large large-font home-link">
                    Create game
                </Link>
                <Link to='/join' className="button large large-font home-link">
                    Join game
                </Link>
            </div>
        )
    }

    redirector(){

        if(this.state.user === 'none'){
            return <Redirect to='/login'/>;
        } else if(this.state.anon){
            return (this.homePage());
        } else {
            this.getProfileInfo();
            console.log('yh fyuck me dude');
        }
    }

    render(){
        return(
            <div>
                {
                    this.state.user 
                ?
                    <div>
                        {this.redirector()}
                    </div>
                : 
                    <Spinner />
                }
            </div>
        );
    }
}

export default Home;
