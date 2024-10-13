
const InstructionCard = () => {
    return (
        <div className="mb" style={{textAlign: 'left'}}>
            <h4>Instructions</h4>
            <p>You can create any combination with the instructions. <br /> Each valid instruction is separated by a space</p>
            <ul>
            <li>Numbers between 0 and 50000</li>
            <li>&apos;+&apos;: to add two numbers</li>
            <li>&apos;-&apos;: to subtract two numbers</li>
            <li>&apos;*&apos;: to multiply two numbers</li>
            <li>&apos;POP&apos;: to remove last number in stack</li>
            <li>&apos;DUP&apos;: to duplicate last number in stack and push result to stack</li>
            <li>&apos;SUM&apos;: to add all numbers in the stack and push result to stack</li>
            <li>&apos;CLEAR&apos;: to clear stack</li>
            </ul>
        </div>
    )
}

export default InstructionCard