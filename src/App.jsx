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
    catch (error) {
      console.log('error', error)
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
      <div className="card mb">
        <Input value={command} onChange={updateInput} />
        <Button clickMethod={runMachine} text='Execute' />
      </div>

      {isLoading && <Spinner />}
      
      {
        showResult && <ResultCard result={result} errorMsg={errorMsg}/>
      }
      <InstructionCard />
    </>
  )
}

export default App
