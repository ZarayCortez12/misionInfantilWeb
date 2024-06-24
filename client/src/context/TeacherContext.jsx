import { createContext, useContext, useState, useEffect } from "react";
import { getTeachersRequest, registerTeacherRequest, editedTeacherRequest } from "../api/teacher.js";
import Cookies from 'js-cookie'

const TeacherContext = createContext();

export const useTeacher = () =>{
    const context = useContext(TeacherContext);
    if(!context) {
        throw new Error("useTeacher must be used within an TeacherProvider");
    }
    return context;
}

export const TeacherProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [usuarios, setUsuarios ] = useState([]);

    const registerTeacher = async (user) => {
        try {
          const res = await registerTeacherRequest(user);
          console.log(res.data);
          setUser(res.data);
          setIsAuthenticated(true);
          setErrors([]);  // Limpiar los errores al tener éxito
          return res.data;
        } catch (error) {
          setErrors(error.response.data);
          console.error(error);
          throw error.response.data.message || "Error en el registro.";
        }
    };

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])


    return (
        <TeacherContext.Provider 
            value={{
                usuarios,
                registerTeacher,
                loading,
                user,
                isAuthenticated,
                errors,
            }}
        >
            {children}
        </TeacherContext.Provider>
    );
}