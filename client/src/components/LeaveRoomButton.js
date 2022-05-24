//to leave a room
const LeaveRoomButton = ({ onMouseUp, onMouseDown }) => {
    return (
        <button style={LeaveRoomButtonStyle} onMouseUp={onMouseUp} onMouseDown={onMouseDown}>Leave Room</button>
    )
}

const LeaveRoomButtonStyle = {
    position: 'absolute',
    marginLeft: '10%'
}

export default LeaveRoomButton