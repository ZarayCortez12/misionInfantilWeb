import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequet, getUsuariosRequest } from "../api/auth";
import Cookies from 'js-cookie'

const AuthContext = createContext()

export const useAuth = () =>{
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [usuarios, setUsuarios ] = useState([]);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data)
            console.log(error);
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            console.log(res)
            setIsAuthenticated(true)
            setUser(res.data)
        } catch (error) {
            console.log(error.response.data)
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    const logout = () =>{
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
    }

    const getUsuarios = async () => {
        try {
            const res = await getUsuariosRequest()
            setUsuarios(res.data);
        } catch (error) {
            console.error(error);
        }  
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();

            if(!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }
            
            try {
                const res =  await verifyTokenRequet(cookies.token)
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }
                    
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false),
                setUser(null);
                setLoading(false);
            }
        }
        checkLogin();
    }, [])

    return (
        <AuthContext.Provider 
            value={{
                usuarios,
                signup,
                signin,
                logout,
                getUsuarios,
                loading,
                user,
                isAuthenticated,
                errors,
            }}
        >
            {children}
        </AuthContext.Provider>
    );

}