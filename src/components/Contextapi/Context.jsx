import React, { createContext, useState } from 'react'

export const InputContext = createContext();

export const Context = ({ children }) => {

    const [value, setvalue] = useState('');

  return (
    <InputContext.Provider value={{value, setvalue}}>
    { children }
    </InputContext.Provider>
  )
}
