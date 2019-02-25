import React, { Component } from 'react';
import styled from 'styled-components';
import firebase from '../../Firebase';
import Spinner from '../../Spinner';

class Table extends Component {

    constructor(props) {
        super(props);

        this.state = {
            whiteData: [],
            blackData: [],
            whiteLoaded: false,
            blackLoaded: false,
        }

        this.getTableData();
    }

    getTableData() {
        const db = firebase.firestore();

        const gameRef = db.collection('games');

        gameRef.where('white', '==', this.props.userID).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                var data = doc.data()
                data.id = doc.id;
                data.playing = 'white';
                data.win = data.winner;
                console.log("Document data:", data);
                this.setState(prevState => ({
                    whiteData: [...prevState.whiteData, data],
                    whiteLoaded: true,
                }));
            }.bind(this));
        }.bind(this)).catch(function(error) {
            console.log("Error getting document:", error);
            this.setState( state => ({
                whiteLoaded: true,
            }))
        }.bind(this));
        gameRef.where('black', '==', this.props.userID).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                var data = doc.data()
                data.id = doc.id;
                data.playing = 'black';
                data.win = !data.winner;
                console.log("Document data:", data);
                this.setState(prevState => ({
                    blackData: [...prevState.blackData, data],
                    blackLoaded: true,
                }));
            }.bind(this));
        }.bind(this)).catch(function(error) {
            console.log("Error getting document:", error);
            this.setState( state => ({
                blackLoaded: true,
            }))
        });
    }

    render(){

        const Table = styled.table`
            width: 100%;
            color: rgb(26, 55, 82);

            border: 2px solid rgb(40, 86, 129);
            border-radius: 15px;
            border-collapse: collapse;

            thead {
                background-color: rgb(66, 81, 114);
                color: #f3d19f;
                
                th {
                    padding: 15px 0px 15px 0px;
                }
            }

            tbody tr:nth-child(even) {
                background-color: rgba(113, 126, 150, 0.5);
            }


            td {
                text-align: center;
            }
        `;



        return (
            <div>
                {this.state.whiteLoaded && this.state.blackLoaded ?
                    <Table>
                        <thead>
                            <tr>
                                <th>Game ID</th>
                                <th>Win/Lose</th>
                                <th>Playing as</th>
                                <th>Opponent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.blackData.concat(this.state.whiteData)
                                .sort(function(a,b){return b.time - a.time})
                                .map((row, index) => (
                                    <tr>
                                        <td>
                                            {row.id}
                                        </td>
                                        <td>
                                            {row.win ? 'Win' : 'Lose'}
                                        </td>
                                        <td>
                                            {row.playing}
                                        </td>
                                        <td>
                                            {row.black === this.props.userID ? row.white : row.black}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                : <Spinner />}
            </div>
        );
    }

}

export default Table;