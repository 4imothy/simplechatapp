//message container
const MessageContainer = ({ messages }) => {

    const renderMessages = () => {
        return (
            Object.entries(messages).map((key, index) => {
                return (
                    <p style={MessagesStyle} key={`msg_${index}`}>
                        {key[1]}
                    </p>
                )
            })
        )
    };
    return (
        <div style={MessageContainerStyle} >
            {renderMessages()}
        </div >
    )
}

const MessageContainerStyle = {
    //ex: backgroundColor: 'red',
    textAlign: 'center',
}

const MessagesStyle = {
    font: 'bold 17px Arial'
}

export default MessageContainer