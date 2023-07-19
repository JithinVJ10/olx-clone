import { useState, createContext } from "react";

export const firebaseContext = createContext('')

export const AuthContext = createContext(null)

export default function Context({children}){
    const [user, setuser] = useState('')

    return(
        <AuthContext.Provider value={{user, setuser}}>
            {children}
        </AuthContext.Provider>
    )
}