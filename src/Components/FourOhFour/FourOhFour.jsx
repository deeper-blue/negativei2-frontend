import React, {Component} from 'react';
import styled from 'styled-components';

class FourOhFour extends Component {

    render() {

        const StyledDiv =  styled.div`

            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            height: calc(100vh - 45px);

            .spinner {
                animation: image-spin infinite 4s linear;
                display: inline-block;
                height: 124px;
                width: 124px;
            }

            .image {
                height: 100%;
                width: 100%;
            }

            .container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            @keyframes image-spin {	
                from {	
                    transform: rotate(0deg);	
                }	
                to {	
                    transform: rotate(360deg);	
                }	
            }

        `;

        return(
            <StyledDiv>
                <div className='container'>
                    <div>
                        404
                    </div>
                    <div className='spinner'>
                        <img src='/assets/profile.jpg' className='image' alt="logo" />
                    </div>
                </div>
            </StyledDiv>
        )
    }
}

export default FourOhFour;