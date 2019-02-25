import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { withRouter } from 'react-router-dom';
import Header from './Header';
import Table from './Table';
import firebase from '../Firebase';
import Spinner from '../Spinner';
import './Profile.scss';
import '../../index.scss';

const Button = styled.button`
    background-color: transparent;
    color: rgb(40, 86, 129);
    text-decoration: none;
    margin:none;
    border: 2px solid rgb(40, 86, 129);
    border-radius: 2px;
    font-weight: bold;
    height: 100%;
    width: 100%;

    ${props => props.primary && css`
        background-color: rgb(40, 86, 129);
        color: white;
    `}
`;

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profileID: this.props.location.pathname.split('/')[2],
            tab: 1,
            loaded: false,
            displayName: "placeholder",
            wins: 0,
            losses: 0,
            profileData: '',
            primary1: true,
            primary2: false,
            primary3: false,
        };
    }

    getProfileInfo(profileID) {
        const db = firebase.firestore();
        const docRef = db.collection('users').doc(profileID);

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
            tab: 1,
            primary1: true,
            primary2: false,
            primary3: false,
        }));
    }

    goStats() {
        this.setState(state => ({
            tab: 2,
            primary1: false,
            primary2: true,
            primary3: false,
        }));
    }

    goOptions() {
        this.setState(state => ({
            tab: 3,
            primary1: false,
            primary2: false,
            primary3: true,
        }));
    }

    componentSwitch(dave) {
        switch(dave) {
            case 1:
                return <Table />;
            case 2:
                return <div>This is where stats will go when they are implemented</div>;
            case 3:
                return <div>This is where profile options will go when they are implemented</div>;
            default:
                return null;
        }
    }

    componentDidMount(){
        this.getProfileInfo(this.props.location.pathname.split('/')[2]);
    }

    componentDidUpdate() {
        // this.getProfileInfo(this.props.location.pathname.split('/')[2]);
        console.log('update');
    }

    render() {

        const Stats = <div>Stats</div>;

        return (
            <div className='profile'>
                {this.state.loaded ?
                    <div className='content'>
                        <Header profileData={this.state.profileData} profileID={this.state.profileID}/>
                        <div className='tabs'>
                            <div className='tab'>
                                <Button onClick={() => this.goTable()} primary={this.state.primary1}>
                                    Table
                                </Button>
                            </div>
                            <div className='tab'>
                                <Button onClick={() => this.goStats()} primary={this.state.primary2}>
                                    Stats
                                </Button>
                            </div>
                            <div className='tab'>
                                <Button onClick={() => this.goOptions()} primary={this.state.primary3}>
                                    Options
                                </Button>
                            </div>
                        </div>
                        <div className='table'>
                            {/* {this.state.tab ? <Table userID={this.state.profileID} /> : Stats} */}
                            {this.componentSwitch(this.state.tab)}
                        </div>
                    </div>
                : <Spinner /> }
            </div>
        );
    }
}

export default withRouter(Profile);
