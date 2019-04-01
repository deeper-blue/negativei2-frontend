import React from 'react';
import { auth } from '../Firebase';
import { Redirect } from 'react-router-dom';
import Spinner from '../Spinner';

class Profiler extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            user: null
        }
    }

    componentDidMount() {
        this.initAuthListener();
    }

    initAuthListener(){
        auth.onAuthStateChanged(function(user) {
            if (user) {
                this.setState({user: user.uid});
            } else {
                this.setState({user: 'none'});
            }
        }.bind(this))
    }

    render(){
        return(
            <div>
                {
                    this.state.user ?
                    <Redirect to={this.state.user === 'none' ? '/login' : '/profile/' + this.state.user}/>
                    :
                    <Spinner fullPage={true}>Redirecting...</Spinner>
                }
            </div>
        )
    }
}

export default Profiler;