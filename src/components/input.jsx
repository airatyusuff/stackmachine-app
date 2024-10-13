
const Input = ({ value, onChange }) => {
    return (
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder='Enter command here e.g 1 2 +'
        />
    )
}

export default Input