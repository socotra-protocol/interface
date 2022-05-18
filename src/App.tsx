import React from "react"
import logo from "./logo.svg"
import { PrimaryButton } from "./components/Button"
function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-pink-light">
        Hello world!
      </h1>
      <PrimaryButton color="pink">Hi</PrimaryButton>
    </>
    
  )
}

export default App
