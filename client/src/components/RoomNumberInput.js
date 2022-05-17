//to create roomNumbe input takes data
const RoomNumberInput = ({onChange}) => {
    return (
        <input style={roomInputStyle} onChange={onChange} placeholder='Enter Room Number' />
    )
}

//add style here
const roomInputStyle={
    //ex: backgroundColor: 'red',
}

export default RoomNumberInput