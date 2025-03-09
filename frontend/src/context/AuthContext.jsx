import { createContext,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext= createContext()
export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null)
    const navigate =useNavigate()
    useEffect(()=>{
        const token =localStorage.getItem("token")
        if(token){
            setUser(token)
        }
    },[])
    function logout(){
        localStorage.removeItem("token")
        setUser(null)
        navigate("/")
    }
    return <AuthContext.Provider value={{user,setUser,logout}}>
        {children}
    </AuthContext.Provider>
}


