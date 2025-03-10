import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [color, setColor] = useState('olive')

  const [length, setLength] = useState(8)

  const [numberAllowed, setNumberAllowed] = useState(false)

  const [symbolsAllowed, setSymbolsAllowed] = useState(false)

  const [password, setPassword] = useState("")

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIKLMNOPQRSTVXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (symbolsAllowed) str += "!@#$%^&*()_+"

    for(let i = 1; i < length; i++){
      const char = (Math.floor(Math.random() * str.length + 1))
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, symbolsAllowed])

  const copyPassword = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current.select()
  }

  useEffect(() => {generatePassword()}, [length, numberAllowed, symbolsAllowed])

  const passwordRef = useRef(null)

  return (
    <div className='w-full h-screen duration-200 place-content-center flex flex-wrap ' style={{backgroundColor: color}}>
      <div className='bg-gray-500 w-[700px] h-[400px] content-center shadow-[10px_10px_30px_black] mb-[100px]'>
        <h1 className='text-white text-center text-xl'> Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden ml-[10px] mr-[10px] mt-[50px]'> 
          <input 
            type="text" 
            value={password} 
            className='outline-none w-full py-1.5 px-3' 
            placeholder='Password' 
            readOnly
            ref={passwordRef}
            />
            <button className='outline-none bg-blue-700 text-white px-3 py-1 shrink-0' onClick={copyPassword}>Copy</button>
        </div>

        <div className='flex flex-wrap text-sm gap-x-2 justify-evenly mt-[50px]'>
          <div className='flex justify-center justify-evenly items-center gap-x-1 bg-gray-600 h-[35px] w-[235px] rounded-lg flex-wrap'>
            <input type="range" name="" id="" min={8} max={20} value={length} className='cursor-pointer' onChange={(e) => setLength(e.target.value)}/>
            <label htmlFor="length" className='text-white text-[17px]'>Length: {length}</label>
          </div>
          
          <div className='flex items-center gap-x-1 h-[35px] w-[200px] rounded-lg bg-gray-600 justify-center'>
            <input type="checkbox" name="" id="" className='cursor-pointer' defaultChecked={numberAllowed} onChange={() => setNumberAllowed((prev) => !prev)}/>
            <label htmlFor="number" className='text-white text-[17px] ml-[15px]'>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1 h-[35px] w-[200px] rounded-lg bg-gray-600 justify-center'>
            <input type="checkbox" name="" id="" className='cursor-pointer' defaultChecked={symbolsAllowed} onChange={() => setSymbolsAllowed((prev) => !prev)}/>
            <label htmlFor="symbols" className='text-white text-[17px] ml-[15px]'>Symbols</label>
          </div>

        </div>
      </div>

      <div className='absolute flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
        <div className='flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl'>

          <button className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
          style={{backgroundColor: 'red'}} onClick={() => setColor('red')}>red</button>

          <button className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
          style={{backgroundColor: 'blue'}} onClick={() => setColor('blue')}>blue</button>

          <button className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
          style={{backgroundColor: 'green'}} onClick={() => setColor('green')}>green</button>

        <button className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
          style={{backgroundColor: 'olive'}} onClick={() => setColor('olive')}>reset</button>

      </div>
    </div>
  </div>
  )
}

export default App
