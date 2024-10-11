import { useState, useCallback} from 'react'
import useFetch from "react-fetch-hook";

import './App.css'
import Button from './components/button'
import ResultCard from './components/resultCard'
import Input from './components/input'
import { BASE_API_URL } from './config';
import InstructionCard from './components/instructions';

function App() {
  const [result, setResult] = useState(0)
  const [errorMsg, setErrorMsg] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [command, setCommand] = useState('')


  const runAPICall = async () => {
    
  }

  const runMachine = async () => {
    try {
      const requestParams = {
        method: "POST",
        body: JSON.stringify({ text: command }),
      };

      const response = await fetch(`${BASE_API_URL}/execute`, requestParams);
      const result = await response.json();

      if(!response.ok) {
        setErrorMsg(result.error_msg)
        setShowResult(true)
        return
      }

      setResult(result.data)
      setErrorMsg(null)
      setCommand('')
      setShowResult(true)
    } catch (error) {
      console.log('error', error)
    }
  }

  const updateInput = (e) => setCommand(e.target.value)

  return (
    <>
      <h1>Stack Machine</h1>
      <div className="card mb">
        <Input value={command} onChange={updateInput} />
        <Button clickMethod={runMachine} text='Execute' />
      </div>
      
      {
        showResult && <ResultCard result={result} errorMsg={errorMsg}/>
      }
      <InstructionCard />
    </>
  )
}

export default App
