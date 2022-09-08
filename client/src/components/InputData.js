//to take user data
const InputData = ({ placeholder, value, onChange }) => {
    return (
        <input style={InputDataStyle} value={value} onChange={onChange} placeholder={placeholder}></input>
    )
}

const InputDataStyle = {
    //ex: backgroundColor: 'red',
    height: '20px',
    fontSize: '20px'
}

export default InputData