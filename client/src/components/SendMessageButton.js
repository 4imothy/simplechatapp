//create button
const SendMessageButton = ({ onClick}) => {
    return (
        <button style={SendMessageButtonStyle} onClick ={onClick}>Send Message</button>
    )
}

const SendMessageButtonStyle = {
    //ex: backgroundColor: 'red',
}

export default SendMessageButton