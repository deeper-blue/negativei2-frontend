import React, { Component } from 'react';
import styled from 'styled-components';
import Header from './Header';
import './Profile.scss';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: false,
        };
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
                            <Button onClick={() => this.setState({tab: true})}>
                                tab1
                            </Button>
                        </div>
                        <div className='tab'>
                            <Button onClick={() => this.setState({tab: false})}>
                                tab2
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