import React, { createContext, useEffect, useState} from 'react';

export const ThemeContext = createContext();

const ThemeContextProvider = ({children}) => {

    const [darkMode, setDarkMode] = useState(true && JSON.parse(localStorage.getItem("isDarkMode")));
    const [isClicked, setIsClicked] = useState(true && JSON.parse(localStorage.getItem("isClicked")));
    
    const toggleDarkMode = () => {
        setDarkMode(theme => !theme);
        setIsClicked(theme => !theme);
    }

    useEffect(() => {
        const checkStorage = (e) => {
            const { key, newValue } = e;
            if (key === "isDarkMode" && key === "isClicked") {
                setDarkMode(JSON.parse(newValue));
                setIsClicked(JSON.parse(newValue));
            }
        }
        window.addEventListener("storage", checkStorage);
        return (() => window.removeEventListener("storage", checkStorage));
    });

    useEffect(() => {
        localStorage.setItem("isDarkMode", JSON.stringify(darkMode));
        localStorage.setItem("isClicked", JSON.stringify(isClicked));
    }, [darkMode, isClicked]);


    return(
        <>
            <ThemeContext.Provider value={{darkMode, toggleDarkMode, isClicked}}>
                {children}
            </ThemeContext.Provider>
        </>
    )
    
}

export default ThemeContextProvider