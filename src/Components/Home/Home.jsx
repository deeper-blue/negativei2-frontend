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
            anon: null,
            exists: null,
            display: 'spin'
        }

        this.display_options = {
            'spinner': <Spinner />,
            'home': (
                <div id="wrapper">
                    <img src="/assets/deeper-blue/robot-banner/banner-alpha.svg" alt="banner" id="banner"></img>
        
                    <div className='home-links'>
                        <Link to='/create' className="button large large-font home-link">
                            Create game
                        </Link>
                        <Link to='/join' className="button large large-font home-link">
                            Join game
                        </Link>
                    </div>
                </div>
                    ),
            'login': <Redirect to='/login' />,
            'create': <Redirect to={'/profile/creation/' + this.state.user} />
        }
    }

    componentDidMount(){
        document.title = 'Deeper Blue: Home';
        this.initAuthListener();
    }

    initAuthListener(){
        auth.onAuthStateChanged(function (user) {
            if (user) {
                this.setState({
                    user: user.uid,
                    anon: user.isAnonymous
                });
            } else {
                this.setState({user: 'none'});
            }
            this.stateHandler();
        }.bind(this));
    }

    getProfileInfo() {
        const db = firebase.firestore();
        const docRef = db.collection('users').doc(this.state.user);

        // On return of profile info from firebase, the display state is updated to the correct value, this will always take place after stateHandler
        docRef.get().then(function(doc) {
            if(doc.exists){
                this.setState({
                    exists: true,
                    display: 'home'
                })
            } else {
                this.setState({
                    exists: false,
                    display: 'create'
                })
            }
        }.bind(this))
    }

    // This function changes the display state on return of the auth listener.
    stateHandler(){

        if(this.state.user === 'none'){
            this.setState({display: 'login'});
        } else if(this.state.anon){
            this.setState({display: 'home'});
        } else {
            this.getProfileInfo();
            this.setState({display: 'spinner'});
        }
    }

    render(){
        return(
            <div>
                {
                    this.state.user 
                ?
                    <div>
                        {this.display_options[this.state.display]}
                    </div>
                : 
                    <Spinner />
                }
            </div>
        );
    }
}

export default Home;
