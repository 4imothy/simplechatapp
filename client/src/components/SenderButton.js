//create button
const SenderButton = ({ onClick}) => {
    return (
        <button style={SenderButtonStyle} onClick ={onClick}>Set Username</button>
    )
}

const SenderButtonStyle = {
    //ex: backgroundColor: 'red',
}

export default SenderButton