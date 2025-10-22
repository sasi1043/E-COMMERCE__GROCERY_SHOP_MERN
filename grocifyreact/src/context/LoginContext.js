import React, { createContext, useContext, useState } from 'react'
 const Loginverify= createContext();

function LoginContext({children}) {
     const[user,setUser]=useState("");
     const[email,setEmail]=useState("");
     const[mobile,setMobile]=useState("");
     
     function loginuser(name){
        setUser(name);
     }
     function loginemail(email){
        setEmail(email);
        console.log(email)
     }
     function loginmobile(mobile){
        setMobile(mobile);
        console.log(mobile)
     }

     function logout(){
      setUser("")
      setEmail("")
      setMobile("")
     }
     
  return (
    <div>
      <Loginverify.Provider value={{email,mobile,user,loginuser,loginemail,loginmobile,logout}}>
        {children}
      </Loginverify.Provider>
    </div>
  )
}

export default LoginContext

export const useLoginVerify=()=>{
  return  useContext(Loginverify)
}
