// PermissionContext.js
import React, { createContext, useState, useEffect } from "react";
import { getAdminPermission } from "./components/CommonAPI/Admin";

export const PermissionContext = createContext();

export const PermissionProvider = ({ children }) => {
  const [permissionData, setPermissionData] = useState(
    JSON.parse(localStorage.getItem("adminPermission")) || null
  );

  useEffect(() => {

      getAdminPermission()
        .then((response) => {
          if (response.Status) {
            setPermissionData(response.Data);
            localStorage.setItem(
              "adminPermission",
              JSON.stringify(response.Data)
            );
          } else {
            setPermissionData([]);
          }
        })
        .catch((err) => {
          console.error("Error fetching admin permissions", err);
        });
 
  }, []);

  return (
    <PermissionContext.Provider value={{ permissionData }}>
      {children}
    </PermissionContext.Provider>
  );
};
