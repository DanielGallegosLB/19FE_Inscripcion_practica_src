import { useLocation, Navigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { API } from "./../apiSelection";

const RequireAuth = ({ modulo }) => {
  const { auth } = useAuth();
  const location = useLocation();


  const hasPermission = async () => {
    try {
      console.log("auth?.perfil "+auth?.perfil)
      console.log("modulo "+modulo)
      const response = await fetch(API+`/perfiles/obtenerpermisos/${auth?.perfil}`);
      if (response.status === 200) {
        const permisos = await response.json();
        console.log("permisos "+permisos)
        console.log("permisos[modulo] "+permisos[modulo])
        console.log("acceso a modulo correcto")
        return permisos[modulo] === true;
      } else {
        console.error('Error al obtener los permisos del perfil');
        return false;
      }
    } catch (error) {
      console.error('Error de red:', error);
      return false;
    }
  };
  

  return (
    auth?.user
    ? hasPermission()
      ? <Outlet />
      : <Navigate to="/unauthorized" state={{ from: location }} replace />
    : <Navigate to="/iniciar-sesion" state={{ from: location }} replace />
  );
};

export { RequireAuth };
