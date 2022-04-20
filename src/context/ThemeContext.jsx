import React, { createContext, useState} from 'react';

export const ThemeContext = createContext();

const ThemeContextProvider = ({children}) => {

    const [darkMode, setDarkMode] = useState(false);


    const toggleDarkMode = () => {
        setDarkMode(darkMode => !darkMode);
        if(darkMode){
            console.log("We are in Dark Mode");
        }else{
            console.log("We are in Light Mode");
        }
    }


    return(
        <>
            <ThemeContext.Provider value={{darkMode, toggleDarkMode}}>
                {children}
            </ThemeContext.Provider>
        </>
    )
    
}

export default ThemeContextProvider