import React, { createContext, useState, useContext } from 'react';
//import { colors, globalStyles } from '../styles/global';
//import { useColorScheme } from 'react-native';

const lightTheme = {
  primary: '#ffffff',
  secondary: '#000000',
  background: '#ffffff',
  text: '#000000',
  whiteBackgroundText: 'white',
};

const darkTheme = {
  primary: '#000000',
  secondary: '#ffffff',
  background: '#000000',
  text: '#ffffff',
  whiteBackgroundText: 'black',
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isLightTheme, setIsLightTheme] = useState(true);

  const toggleTheme = () => {
    setIsLightTheme((prevIsLightTheme) => !prevIsLightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme: isLightTheme ? lightTheme : darkTheme, toggleTheme, isLightTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export { lightTheme, darkTheme };