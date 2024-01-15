import React, { createContext } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
   const method = () => {
      console.log("from theme provider");
   };

   return (
      <ThemeContext.Provider value={{ theme: "just for testing", method }}>
         {children}
      </ThemeContext.Provider>
   );
}