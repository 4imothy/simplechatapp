//to create roomNumbe input takes data
const JoinRoomButton = ({ onClick }) => {
    return (
        <button style={JoinRoomButtonStyle} onClick={onClick}>Join Room</button>
    )
}

//add style here
const JoinRoomButtonStyle = {
    //ex: backgroundColor: 'red',
}

export default JoinRoomButton