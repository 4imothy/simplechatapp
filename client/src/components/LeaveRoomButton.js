//to leave a room
const LeaveRoomButton = ({ onMouseUp, onMouseDown }) => {
    return (
        <button style={LeaveRoomButtonStyle} onMouseUp={onMouseUp} onMouseDown={onMouseDown}>Leave Room</button>
    )
}

const LeaveRoomButtonStyle = {
    marginLeft: '2%',
    height: '30px',
    fontSize: '20px'
}

export default LeaveRoomButton