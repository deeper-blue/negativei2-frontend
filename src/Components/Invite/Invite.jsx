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
        var self = this;
        auth.onAuthStateChanged(function (user) {
            if (user) {
                self.setState({user: user.uid}, () => self.join());
            } else {
                self.setState({user: 'none'});
                self.setState({
                    redirect: {pathname: '/login'}
                })
            }
        });
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
                self.setState({
                    redirect: {
                        pathname: '/join',
                        data: {
                            error: `Couldn't join game ${self.state.gameID}.`
                        }
                    }
                });
            });
    }

    render() {
        return (
            this.state.user ?
                this.state.redirect ?
                    <Redirect to={{
                        pathname: this.state.redirect.pathname,
                        state: this.state.redirect.data
                    }}/>
                :
                    <Spinner fullPage={true}/>
            :
                <Spinner fullPage={true}/>
        )
    }
}

export default Invite;