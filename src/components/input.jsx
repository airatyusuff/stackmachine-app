
const Input = ({ value, onChange }) => {
    return (
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder='Enter command here'
        />
    )
}

export default Input