import React, { createContext, useContext, useState, useEffect } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [activeItem, setActiveItem] = useState(localStorage.getItem("activeItem") || "");


  useEffect(() => {
    localStorage.setItem("activeItem", activeItem);
  }, [activeItem]); // Save active item in localStorage whenever it changes


  return (
    <SidebarContext.Provider value={{ activeItem, setActiveItem }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
