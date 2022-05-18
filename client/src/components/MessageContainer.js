//message container
const MessageContainer = ({ text, messages }) => {

    const renderMessages = () => {
        return (
            Object.entries(messages).map((key, index) => {
                return (
                    <p key={`msg_${index}`}>
                        {key[1]}
                    </p>
                )
            })
        )
    };
    return (
        <div style={MessageContainerStyle} >
            <p>{text}</p>
            {renderMessages()}
        </div >
    )
}

const MessageContainerStyle = {
    //ex: backgroundColor: 'red',
}

export default MessageContainer