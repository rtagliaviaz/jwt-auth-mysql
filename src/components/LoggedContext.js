import React, {useState, createContext} from 'react'

export const LoggedContext = createContext()

export const LoggedProvider = (props) => {
  const [logged, setLogged] = useState(false)
  
  return (
    
    <LoggedContext.Provider value={[logged, setLogged]}>
      {props.children}
    </LoggedContext.Provider>
  )
}
