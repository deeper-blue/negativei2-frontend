import React from 'react';
import styled from 'styled-components';

class PlayerStats extends React.Component {
    render() {

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

        return(
            <Styled>
                <div className='stats'>
                    <div className='stat'>
                        {this.props.profileData.wins}
                    </div>
                    <div className='stat'>
                        {this.props.profileData.losses}
                    </div>
                    <div className='stat'>
                    {Math.trunc((this.props.profileData.wins / (this.props.profileData.losses + this.props.profileData.wins)) * 100) + '%'}
                    </div>
                </div>
            </Styled>
        )
    }
}

export default PlayerStats;