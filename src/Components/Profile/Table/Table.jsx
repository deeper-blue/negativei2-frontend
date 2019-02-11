import React, { Component } from 'react';
import styled from 'styled-components';

class Table extends Component {

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
                            <td>2352542</td>
                            <td>White</td>
                            <td>Dave</td>
                        </tr>
                        <tr>
                            <td>2342344</td>
                            <td>Black</td>
                            <td>Andy</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }

}

export default Table;