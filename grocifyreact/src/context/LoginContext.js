import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
 const Loginverify= createContext();

export default function LoginContext({children}) {
  const navigate=useNavigate()
     const[user,setUser]=useState("");
     const[email,setEmail]=useState("");
     const[mobile,setMobile]=useState("");
     const[id,setId]=useState("");
     
     function loginuser(name){
        setUser(name);
     }
     function loginemail(email){
        setEmail(email);
      //   console.log(email)
     }
     function loginmobile(mobile){
        setMobile(mobile);
      //   console.log(mobile)
     }
     function loginuserID(id){
        setId(id);
        console.log(id)
     }


     function logout(){
      setUser("")
      setEmail("")
      setMobile("")
      navigate('/')
      localStorage.removeItem("token");
      window.location.reload()
     }
        
     function homelogout(){
      setUser("")
     }
     
  return (
 
      <Loginverify.Provider value={{email,mobile,user,loginuser,loginemail,loginmobile,logout,loginuserID,id,homelogout}}>
        {children}
      </Loginverify.Provider>
  )
}

export function useLoginVerify(){
  return useContext(Loginverify)
}
