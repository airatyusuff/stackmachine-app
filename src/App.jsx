import { useState} from 'react'

import './App.css'
import Button from './components/button'
import ResultCard from './components/resultCard'
import Input from './components/input'
import { BASE_API_URL } from './config';
import InstructionCard from './components/instructions';
import Spinner from './components/Spinner';

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(0)
  const [errorMsg, setErrorMsg] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [command, setCommand] = useState('')

  const reset = () => {
    setShowResult(false)
    setCommand('')
  }
  const runMachine = async () => {
    setIsLoading(true)
    try {
      const requestParams = {
        method: "POST",
        body: JSON.stringify({ text: command }),
      };

      const response = await fetch(`${BASE_API_URL}/execute`, requestParams);
      const result = await response.json()

      if(!response.ok) {
        handleError(result)
        return
      }

      handleResult(result)
    }
    catch (err) {
      setShowResult(true)
      setErrorMsg(`${err}`)
      setIsLoading(false)
    }
  }

  const updateInput = (e) => setCommand(e.target.value)

  const handleError = (result) => {
    setErrorMsg(result.error_msg)
    setShowResult(true)
    setIsLoading(false)
  }

  const handleResult = (result) => {
    setResult(result.data)
    setErrorMsg(null)
    setCommand('')
    setShowResult(true)
    setIsLoading(false)
  }


  return (
    <>
      <h1>Stack Machine</h1>
      <p className='mb'>This machine can process valid operations and returns the number at the top of the stack.</p>
      <div className="card mb">
        <Input value={command} onChange={updateInput} />

        <div style={{display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '8px'}}>
          <Button clickMethod={runMachine} text='Execute' />
          <Button clickMethod={reset} text='Reset' btnColor={"gray"} />
        </div>
      </div>

      {isLoading && <Spinner />}
      {showResult && <ResultCard result={result} errorMsg={errorMsg}/>}
      <InstructionCard />
    </>
  )
}

export default App
