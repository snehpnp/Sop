// // import React, { createContext, useState, useEffect } from "react";

// // const ThemeContext = createContext();

// // export const ThemeProvider = ({ children }) => {
// //   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

// //   useEffect(() => {
// //     document.body.setAttribute("data-theme", theme);
// //     localStorage.setItem("theme", theme);
// //   }, [theme]);

// //   const toggleTheme = () => {
// //     setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
// //   };

// //   return (
// //     <ThemeContext.Provider value={{ theme, toggleTheme }}>
// //       {children}
// //     </ThemeContext.Provider>
// //   );
// // };

// // export const useTheme = () => React.useContext(ThemeContext);


// // ThemeContext.js or ThemeProvider.jsx
// import React, { createContext, useState, useEffect } from "react";
// import { getThemeForAdminAndClient } from "./components/CommonAPI/Common";

// const ThemeContext = createContext();
// // const availableThemes = [
// //   "Light",
// //   "Blackout",
// //   "Deep-Pulse",
// //   "Peach-Bloom",
// //   "Dusty-Rose",
// //   "Midnight-Pulse",
// //   "Forest-Dew",
// //   "Rustic-Roast", 
// //   "Green-Forest", 
// //   "Blue-Forest", 
// //   "Deep-Wood", 
// //   "Aurora-Glow", 
// //   "Vivid-Fusion", 
// //   "Golden-Hour"  
// // ];

// const availableThemes = [];

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "Deep-Pulse");
//   // const [availableThemes, setAvailableThemes] = useState([]);


//   const fetchTheme = async () => {
//     try {
//       const response = await getThemeForAdminAndClient();
//       if (response.Status) {

//         availableThemes = response?.data;
//       }
//       // const data = await response.json();
//       // setAvailableThemes(data);
//     } catch (error) {
//       console.error("Error fetching themes:", error);
//     }
//   }

//   useEffect(() => {
//     fetchTheme();
//   }, []);

//   useEffect(() => {
//     document.body.setAttribute("data-theme", theme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const changeTheme = (newTheme) => {
//     if (availableThemes.includes(newTheme)) {
//       setTheme(newTheme);
//     }
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, changeTheme, availableThemes }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => React.useContext(ThemeContext);



// ThemeContext.js
import React, { createContext, useState, useEffect } from "react";
import { getThemeForAdminAndClient } from "./components/CommonAPI/Common";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "Light");
  const [availableThemes, setAvailableThemes] = useState([]);

  const fetchTheme = async () => {
    try {
      const response = await getThemeForAdminAndClient();
      if (response.Status) {
        setAvailableThemes(response?.Data || []);
      }
    } catch (error) {
      console.error("Error fetching themes:", error);
    }
  };

  useEffect(() => {
    fetchTheme();
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const changeTheme = (newTheme) => {
    if (availableThemes.includes(newTheme)) {
      setTheme(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, availableThemes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => React.useContext(ThemeContext);
