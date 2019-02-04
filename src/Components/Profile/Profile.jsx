import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from './Header';
import './Profile.scss';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: true,
        };

        this.goTable = this.goTable.bind(this);
        this.goStats = this.goStats.bind(this);
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
            height: 100%;
            width: 100%;
        `;

        const Table = <div>table</div>
        const Stats = <div>Stats</div>

        return (
            <div className='profile'>
                <div className='content'>
                    <Header />
                    <div className='tabs'>
                        <div className='tab'>
                            <Button onClick={this.goTable}>
                                TAble
                            </Button>
                        </div>
                        <div className='tab'>
                            <Button onClick={this.goStats}>
                                Stats
                            </Button>
                        </div>
                    </div>
                    <div className='table'>
                        {this.props.tab ? Table : Stats}
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;