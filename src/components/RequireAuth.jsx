import { useLocation, Navigate, Outlet } from "react-router-dom";
import React, {useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { API } from "./Home.jsx";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const [perfiles, setPerfiles] = useState([]);
  const [perfil, setPerfil] = useState([]);


  const getPerfiles = async () => {
    try {
      const response = await fetch(API + '/perfiles/obtener'); // Ruta para obtener usuarios
      const data = await response.json();
      setPerfiles(data.perfiles);
    } catch (error) {
      console.error('Error de red:', error);
    }
  }

  const getPerfilPermisions = async () => {
    //authPerfil = auth?.perfil
    try {
      const response = await fetch(API + `/perfiles/obtener/${authPerfil}`,);
      const data = await response.json();
      setPerfiles(data.perfiles);
    } catch (error) {
      console.error('Error de red:', error);
    }
  }

  useEffect(() => {
    getPerfiles();
    /*
    getPerfilPermisions();
    
    console.log("perfiles", perfiles)
  console.log("perfiles.find((perfil) => perfil.allowedRoles===true", perfiles.find((perfil) => perfil.allowedRoles===true))
  console.log("allowedRoles", allowedRoles)
  console.log("auth?.perfil", auth?.perfil)  
  */
  }, []);

  

  return (
    // si el perfil del usuario Contiene el IP=true, entonces muestra el componente Outlet

    /*
    perfiles?.find((perfil) => perfil.IP===true)
    ? <Outlet />
    : 
    */
    
    

    auth?.perfil?.find((perfil) => allowedRoles?.includes(perfil))
        ? <Outlet />
        : auth?.user
          ? <Navigate to="/unauthorized" state={{ from: location }} replace />
          : <Navigate to="/iniciar-sesion" state={{ from: location }} replace />
  );
};

export { RequireAuth };