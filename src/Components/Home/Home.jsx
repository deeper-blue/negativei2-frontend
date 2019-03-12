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

        // This list contains the 4 different jsx elements that need to be loaded depending on the user's state
        this.display_options = [
            <Spinner />,
            (
                <div className='home-links'>
                    <Link to='/create' className="button large large-font home-link">
                        Create game
                    </Link>
                    <Link to='/join' className="button large large-font home-link">
                        Join game
                    </Link>
                </div>
            ), 
            <Redirect to='/login'/>, 
            <Redirect to={'/profile/creation/' + this.state.user} />
        ];
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
                    display: 1
                })
            } else {
                this.setState({
                    exists: false,
                    display: 3
                })
            }
        }.bind(this))
    }

    // This function changes the display state on return of the auth listener.
    stateHandler(){

        if(this.state.user === 'none'){
            this.setState({display: 2});
        } else if(this.state.anon){
            this.setState({display: 1});
        } else {
            this.getProfileInfo();
            this.setState({display: 0});
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
