import React from 'react'

const CurrentUser = (props) => {
    return(
        <div className='userName'>
            <p>{ props.userName }</p>
        </div>
    )
};

export default CurrentUser