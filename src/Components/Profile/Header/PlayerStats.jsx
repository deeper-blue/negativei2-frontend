import React from 'react';
import styled from 'styled-components';

class PlayerStats extends React.Component {
    render() {

        const Styled = styled.div`

            

            .stats {
                display: flex;
                flex-direction: row;
                margin: 15px;
                justify-content: space-evenly;
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
                        <div>wins</div>
                        {this.props.profileData.wins ? this.props.profileData.wins : 0}
                    </div>
                    <div className='stat'>
                        <div>losses</div>
                        {this.props.profileData.losses ? this.props.profileData.wins : 0}
                    </div>
                    <div className='stat'>
                        <div>winrate</div>
                    {this.props.profileData.losses ? Math.trunc((this.props.profileData.wins / (this.props.profileData.losses + this.props.profileData.wins)) * 100) + '%' : 0 + '%'}
                    </div>
                </div>
            </Styled>
        )
    }
}

export default PlayerStats;