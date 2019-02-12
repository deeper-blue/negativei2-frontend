import React from 'react';

class Spinner extends React.Component {
    render(){
        return (
            <div className='spinner'>
                <img src='/assets/profile.jpg' className='pic' alt='spinner' />
            </div>
        );
    }
}

export default Spinner;