import React, {Component} from 'react';
import styled from 'styled-components';

class FourOhFour extends Component {

    componentDidMount() {
        document.title = 'Deeper Blue: 404';
    }

    render() {

        const StyledDiv =  styled.div`

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: calc(100vh - 45px);
            font-size: calc(10px + 2vmin);

            .spinner {
                animation: image-spin infinite 4s linear;
                display: inline-block;
                padding: 15px;
                height: 20vmin;
                width: 20vmin;
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
                text-align: center;
                width: 500px;
            }

            .info {
                padding: 15px;
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
                    <div className='spinner'>
                        <img src='/assets/profile.jpg' className='image' alt="logo" />
                    </div>
                    <div>
                        404 ERROR
                    </div>
                    <div className='info'>
                        <p>Whoopsie poopsie! Looks like we couldn't find that page for you!</p>
                        <p>Maybe you'd like to go back to our <a href="/">home page</a>?</p>
                    </div>
                </div>
            </StyledDiv>
        )
    }
}

export default FourOhFour;