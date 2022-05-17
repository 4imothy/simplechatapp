//to create message input takes data
const MessageInput = ({onChange }) => {
    return (
        <input style={MessageInputStyle} onChange={onChange} placeholder='Enter Message' />
    )
}

//add style here
const MessageInputStyle = {
    //ex: backgroundColor: 'red',
}

export default MessageInput