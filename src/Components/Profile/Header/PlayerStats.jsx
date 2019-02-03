import React from 'react';
import styled from 'styled-components';

const Styled = styled.div`
.stats {
    display: flex;
    flex-direction: row;
    margin: 15px;
}

.stat {
    display: flex;
    flex-direction: column;
    margin-right: 25px;
}
`;

function PlayerStats() {
    return(
        <Styled>
            <div className='stats'>
                <div className='stat'>
                    wins
                </div>
                <div className='stat'>
                    losses
                </div>
                <div className='stat'>
                    winrate
                </div>
            </div>
        </Styled>
    )
}

export default PlayerStats;