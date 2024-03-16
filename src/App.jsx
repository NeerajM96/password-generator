import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  // useCallback(callback fn, dependencies) hook is used if we need to call a function multiple times, it helps in optimizing 
  // the function calls by memoization and this dependency is different from that of useEffect
  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "`~!@#$%^&*()_+"

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random()*str.length +1)  // +1 to handle if 0 generated
      pass += str.charAt(char)
      
    }

    setPassword(pass)

  }, [length,numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()    // highlights the input text for this reference to give a nice User experience.
    // passwordRef.current?.setSelectionRange(0,6) // highlights only from index 0 to 5. Optimized approach to highlight only needed

    window.navigator.clipboard.writeText(password)
  },[password])

  // useEffect(callback fn, dependencies) this dependency tells us to call passwordGenerator if their is some changes in
  // either of length,numberAllowed,charAllowed,passwordGenerator
  useEffect(()=>{
    passwordGenerator()
  }, [length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" 
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />

        <button className='outline-none bg-blue-700 rounded-r-md px-3 py-2 text-white shrink-0 transition-colors duration-200 hover:bg-blue-600'
        onClick={copyPasswordToClipboard}
        >Copy</button>
      </div>

      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range" 
            min={6}
            max={40}
            value={length}
            className='cursor-pointer'
            onChange={(event) => setLength(event.target.value)}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={()=> setNumberAllowed((prev) => !prev)}
           />
           <label>Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
          type="checkbox"
          defaultChecked={charAllowed}
          id="charInput"
          onChange={()=> setCharAllowed((prev) => !prev)}
           />
           <label>Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
