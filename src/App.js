import React, { useState,useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AdminRoute from './Routes/Admin.Routes'
import UserRoute from './Routes/User.Routes'
import SuperAdminRoute from './Routes/SuperAdmin.Routes'
import SubAdminRoutes from './Routes/SubAdmin.Routes'
import Login from './components/auth/Login';
import Register from './components/auth/Register'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAdminPermission } from "./components/CommonAPI/Admin";

const App = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const Role = localStorage.getItem('Role')
  const [permissionData, setPermissionData] = useState(null);

  useEffect(() => {
    if (location.pathname.startsWith("/updatepassword")) {
      navigate(location.pathname);
      return;
    }
    if (location.pathname === "/register") {
      navigate("/register");
      return;
    }

    // Check if user details exist
    if (!Role || Role === "null" || location.pathname === "/login") {
   
      
      navigate("/login");
      return;
    }


    // Redirect based on user role and route prefix
    switch (Role) {
      case "Admin":
        if (location.pathname === "/login" || location.pathname === "/" || !location.pathname.startsWith("/admin")) {
          navigate("/admin/dashboard");
        }
        break;
      case "User":
        if (location.pathname === "/login" || location.pathname === "/" || !location.pathname.startsWith("/user")) {
          navigate("/user/dashboard");
        }
        break;
        case "Subadmin":
         
          
        if (location.pathname === "/login" || location.pathname === "/" || !location.pathname.startsWith("/subadmin")) {
          navigate("/subadmin/dashboard");
         
          
        }
        break;
      default:
        break;
    }
  }, [navigate, location.pathname, Role]);



    const AdminPermission = async () => {
      try {
        await getAdminPermission()
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
            console.log("Error Group data fetch", err);
          });
      } catch {
        console.log("Error Group data fetch");
      }
    };

    useEffect(() => {
      AdminPermission();
    }, []);



  return (
    <>
 
      <Routes>
        <Route path="/admin/*" element={(Role === "Admin") ? <AdminRoute permissionData={permissionData} /> : <Login />} />
        <Route path="/user/*" element={(Role === "User") ? <UserRoute permissionData={permissionData} /> : <Login />} />
        <Route path="/superadmin/*" element={(Role === "Superadmin") ? <SuperAdminRoute permissionData={permissionData} /> : <Login />} />
        <Route path="/subadmin/*" element={(Role === "Subadmin") ? <SubAdminRoutes permissionData={permissionData} /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes> 
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
