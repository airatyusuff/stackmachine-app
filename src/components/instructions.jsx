
const InstructionCard = () => {
    return (
        <div className="mb">
            <h4>Valid Instructions</h4>
            <p>You can create any combination with the instructions. <br /> Each valid instruction is separated by a space</p>
            <ul>
            <li>Numbers between 0 and 50000</li>
            <li>'+' to add two numbers</li>
            </ul>
        </div>
    )
}

export default InstructionCard