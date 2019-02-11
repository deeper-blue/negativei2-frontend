import React, { Component } from 'react';
import styled from 'styled-components';
import firebase from '../../Firebase';

class Table extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: '',
        }

        this.getTableData();
    }

    getTableData() {
        const db = firebase.firestore();

        const docRef = db.collection('games').doc('AMqCzVSxaxjWjTEFsQEt');

        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                this.setState(state => ({
                    data: doc.data()
                }));
            } else {
                console.log("No such document! xd");
            }
        }.bind(this)).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

    render(){

        const Table = styled.table`
            width: 100%;
        `;

        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Match ID</th>
                            <th>Winner</th>
                            <th>Opponent</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.props.gameList[0]}</td>
                            <td>{this.state.data.black}</td>
                            <td>{this.state.data.white}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }

}

export default Table;