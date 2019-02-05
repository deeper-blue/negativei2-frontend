import React, { Component } from 'react';
import styled from 'styled-components';

class Table extends Component {

    render(){

        const Table = styled.table`
            width: 100%;
        `;

        const TR = styled.tr`

            border: 2px solid black;

        `;

        return (
            <div>
                <Table>
                    <TR>
                        <th>Match ID</th>
                        <th>Winner</th>
                        <th>Opponent</th>
                    </TR>
                    <tr>
                        <th>2352542</th>
                        <th>White</th>
                        <th>Dave</th>
                    </tr>
                    <tr>
                        <th>2342344</th>
                        <th>Black</th>
                        <th>Andy</th>
                    </tr>
                </Table>
            </div>
        );
    }

}

export default Table;