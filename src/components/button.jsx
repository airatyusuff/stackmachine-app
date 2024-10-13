
const Button = ({ text, clickMethod, btnColor }) => {
    return <button style={{backgroundColor: btnColor}} onClick={clickMethod}>{text}</button>
}

export default Button