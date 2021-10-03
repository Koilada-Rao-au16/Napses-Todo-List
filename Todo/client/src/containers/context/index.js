import {createContext,useState,useEffect} from 'react';

export const globalContext = createContext()

const Store = ({children})=>{   

  
    const [token,setToken] = useState("")

    useEffect(()=>{
        setToken(localStorage.getItem('token'))
    },[])
   

    return(

        <globalContext.Provider 
        value={{
            token,setToken
        }}
        >
            {children}
        </globalContext.Provider>
    )
}

export default Store;