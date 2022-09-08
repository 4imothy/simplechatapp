//to confirm user data
const ConfirmInputButton = ({ onMouseDown, onMouseUp }) => {
    return(
        <button style={ConfirmInputButtonStyle} onMouseDown = {onMouseDown} onMouseUp={onMouseUp}>Confirm</button>
    )
}

const ConfirmInputButtonStyle ={
    //ex: backgroundColor: 'red',
    marginTop: '-20px',
    height: '30px',
    fontSize: '20px'
}

export default ConfirmInputButton