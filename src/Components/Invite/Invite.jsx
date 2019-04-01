import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Spinner from '../Spinner';
import { auth } from '../Firebase';
import server from '../Server';

class Invite extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            gameID: props.location.pathname.split('/')[2],
            redirect: false
        }

        this.initAuthListener = this.initAuthListener.bind(this);
    }

    componentDidMount() {
        this.initAuthListener();
    }

    initAuthListener(){
        auth.onAuthStateChanged(function (user) {
            if (user) {
                this.setState({user: user.uid});
            } else {
                auth.signInAnonymously()
                .then(function(anon) {
                    this.setState({user: anon});
                })
                .catch(function(error) {
                    console.log(error);
                });
            }
            this.join();
        }.bind(this));
    }

    join = () => {
        var self = this;

        var query = new FormData();
        query.set('game_id', this.state.gameID);
        query.set('player_id', this.state.user);

        server.post('/joingame', query)
            .then(function(response) {
                self.props.history.push('/play/' + response.data.id);
            })
            .catch(function(error) {
                console.log(error);
                self.setState({redirect: true});
            });

    }

    render() {
        return (
            this.state.user ?
                this.state.redirect ?
                    <Redirect to={{
                        pathname: "/join",
                        state: {
                            error: `Couldn't join game ${this.state.gameID}.`
                        }
                    }}/>
                :
                    <Spinner fullPage={true}/>
            :
                <Spinner fullPage={true}/>
        )
    }
}

export default Invite;