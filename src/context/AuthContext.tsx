import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { formValue } from "../components/LoginForm";
import { loginUser, registerUser } from "../utils/authService";

interface User {
    id: number,
    username: String,
    email: String
};

interface AuthContextType {
    user: User | null;
    token: String | null;
    isAuthenticated: boolean;
    loading: boolean;

    login: (
        param: formValue
    ) => Promise<void>;

    register: (
        {username, email, password}
        :
        {username: String,
        email: String,
        password: String}
    ) => Promise<void>;

    logout: ()=> void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode})=>{
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<String | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if(storedToken && storedUser)
        {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }

        setLoading(false);
    }, []);
    
    const login = async(param: formValue)=>{
        const data = await loginUser(param);

        setUser(data.user);

        setToken(data.token);

        localStorage.setItem("token", data.token);

        localStorage.setItem("user", JSON.stringify(data.user));
    };


    const register = async({username, email, password} : {username: String, email: String, password: String})=>{
        const data = await registerUser(username, email, password);

        login({email, password});
    };


    const logout = ()=>{
        setUser(null);

        setToken(null);

        localStorage.removeItem("token");

        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider 
        value={{
            user,
            token,
            loading,
            isAuthenticated: !!token,
            login,
            register,
            logout
        }}
        >
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = ()=>{
    const context = useContext(AuthContext);

    if(!context)
    {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
};