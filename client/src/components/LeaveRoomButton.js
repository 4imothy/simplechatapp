//to leave a room
const LeaveRoomButton = ({ onMouseUp, onMouseDown }) => {
    return (
        <button style={LeaveRoomButtonStyle} onMouseUp={onMouseUp} onMouseDown={onMouseDown}>Leave Room</button>
    )
}

const LeaveRoomButtonStyle = {
    marginLeft: '2%',
    height: '4vh',
    fontSize: '2vh'
}

export default LeaveRoomButton