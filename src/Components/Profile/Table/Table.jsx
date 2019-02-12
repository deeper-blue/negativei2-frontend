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
                console.log("Document data:", doc.data());
                this.setState(prevState => ({
                    whiteData: [...prevState.whiteData, doc.data()],
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
                console.log("Document data:", doc.data());
                this.setState(prevState => ({
                    blackData: [...prevState.blackData, doc.data()],
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
        `;



        return (
            <div>
                {this.state.whiteLoaded && this.state.blackLoaded ?
                    <Table>
                        <thead>
                            <tr>
                                <th>Game ID</th>
                                <th>Winner</th>
                                <th>Opponent</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr>
                                <td>ids will go here when i deal with loading times</td>
                                <td>{this.state.whiteData.black}</td>
                                <td>{this.state.blackData.white}</td>
                            </tr>
                        </tbody>
                    </Table>
                : <Spinner />}
            </div>
        );
    }

}

export default Table;