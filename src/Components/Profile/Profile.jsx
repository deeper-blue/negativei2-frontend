import React, { Component } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Table from './Table';
import firebase from '../Firebase';
import Spinner from '../Spinner';
import './Profile.scss';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: true,
            loaded: false,
            displayName: "placeholder",
            wins: 0,
            losses: 0,
            profileID: this.props.location.pathname.split('/')[2],
            profileData: '',
        };

        this.getProfileInfo();
    }

    getProfileInfo() {
        const db = firebase.firestore();
        const docRef = db.collection('users').doc(this.state.profileID);

        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log('Document data:', doc.data());
                this.setState(state => ({
                    profileData: doc.data(),
                    displayName: doc.data().name,
                    wins: doc.data().wins,
                    losses: doc.data().losses,
                    loaded: true,
                }));
            } else {
                console.log('No such document!');
                this.setState(state => ({
                    loaded: true,
                }))
            }
        }.bind(this)).catch(function(error) {
            console.log('Error getting document:', error);
        });
    }

    goTable() {
        this.setState(state => ({
            tab: true
        }));
    }

    goStats() {
        this.setState(state => ({
            tab: false
        }));
    }

    render() {

        

        const Button = styled.button`
            background: transparent;
            color: black;
            text-decoration: none;
            margin:none;
            border: 2px solid black;
            border-radius: 2px;
            height: 100%;
            width: 100%;
        `;

        const Stats = <div>Stats</div>

        return (
            <div className='profile'>
                {this.state.loaded ?
                    <div className='content'>
                        <Header profileData={this.state.profileData} />
                        <div className='tabs'>
                            <div className='tab'>
                                <Button onClick={() => this.goTable()}>
                                    Table
                                </Button>
                            </div>
                            <div className='tab'>
                                <Button onClick={() => this.goStats()}>
                                    Stats
                                </Button>
                            </div>
                        </div>
                        <div className='table'>
                            {this.state.tab ? <Table userID={this.state.profileID} /> : Stats}
                        </div>
                    </div>
                : <Spinner /> }
            </div>
        );
    }
}

export default Profile;
