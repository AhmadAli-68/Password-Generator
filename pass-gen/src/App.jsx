import { useState, useCallback, useEffect, useRef } from "react";
import "tailwindcss/tailwind.css";
import './index.css'

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef Hook
  const passwordRef = useRef();

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += '!@#$%^&*()-_+={}[]|';

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto rounded-lg px-4 bg-gray-800 text-orange-500 py-4">
      <h1 className="text-white text-center my-3">Password Generator</h1>

      <div className="flex rounded-lg overflow-hidden mb-4">
        <input type="text" readOnly placeholder="Password" className="outline-none w-96 rounded-lg py-1 px-3" value={password} ref={passwordRef} />
        <button className="button outline-none mx-3 border-none bg-blue-700 text-teal-50 px-3 py-1 focus:outline-none" onClick={copyPasswordToClipboard}>Copy</button>
      </div>

      <div className="flex text-sm gap-x-5">
        <div className="flex items-center gap-x-2">
          <input type="range" min={6} max={100} className="cursor-pointer" value={length} onChange={(e) => setLength(e.target.value)} />
          <label className="mx-4 p-4">{length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input type="checkbox" id="numberInput" defaultChecked={numberAllowed} onChange={() => setNumberAllowed((prev) => (!prev))} />
          <label htmlFor="numberInput">Number</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input type="checkbox" id="characterInput" defaultChecked={characterAllowed} onChange={() => setCharacterAllowed((prev) => (!prev))} />
          <label htmlFor="characterInput">Character</label>
        </div>
      </div>
    </div>
  )
}

export default App