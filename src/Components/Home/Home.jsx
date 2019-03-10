import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { auth } from '../Firebase';
import Spinner from '../Spinner';
import './Home.scss';

class Home extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            user: null
        }
    }

    componentDidMount(){
        this.initAuthListener();
    }

    initAuthListener(){
        auth.onAuthStateChanged(function (user) {
            if (user) {
                this.setState({user: user.uid});
            } else {
                this.setState({user: 'none'});
            }
        }.bind(this));
    }

    render(){
        return(
            <div>
                {
                    this.state.user 
                ?
                    <div>
                        {
                            this.state.user == 'none' 
                        ?
                            <Redirect to='/login'/>
                        :
                            <div className='home-links'>
                                <Link to='/create' className="button large large-font home-link">
                                    Create game
                                </Link>
                                <Link to='/join' className="button large large-font home-link">
                                    Join game
                                </Link>
                            </div>
                        }
                    </div>
                : 
                    <Spinner />
                }
            </div>
        );
    }
}

export default Home;
