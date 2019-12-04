import React from 'react'

const Message = (props) => {
    let time = new Date(props.message.time);
    let strTime = time.getHours() + ':' + time.getMinutes();
    return(
        <div className='message'>
            <div className='message-header'>
                <h6 className='message-sender'>{ props.message.userName }</h6>
                <h6 className='message-time'><b>{ strTime }</b></h6>
            </div>
            <p className='message-body'>{ props.message.text }</p>
        </div>
    )
};

export default Message