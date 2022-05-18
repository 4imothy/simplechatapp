//to create roomNumbe input takes data
const SenderInput = ({onChange}) => {
    return (
        <input style={SenderInputStyle} onChange={onChange} placeholder='Enter Username To Chat' />
    )
}

//add style here
const SenderInputStyle={
    //ex: backgroundColor: 'red',
}

export default SenderInput