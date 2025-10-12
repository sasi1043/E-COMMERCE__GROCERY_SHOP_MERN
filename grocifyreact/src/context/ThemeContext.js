import { createContext, useContext, useState } from "react"

const Themechange=createContext();

export default function ThemeContext({children}) {
  
   const[theme,setTheme]=useState("light")

    //function to  change  theme
   const toggletheme=()=>{
    setTheme((prev)=>(prev==="light"?"dark":"light"));
   }

  return (
    <Themechange.Provider value={{theme,toggletheme}}>
        {children}
    </Themechange.Provider>
  );
}

export const useTheme=()=>{
    return useContext(Themechange)
}

