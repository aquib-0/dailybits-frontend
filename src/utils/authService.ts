import type { formValue } from "../components/LoginForm";
import api from "../api/api";

export const loginUser = async(param: formValue)=>{
    console.log("Login function called!");
    try{
        const response = await api.post("/auth/login", param);
        const data = response.data;
        return data;
    }

    catch(err: any)
    {
        console.log("error from the backend", err);
    }

};

export const registerUser = async(username: String, email: String, password: String)=>{
    try{
        const response = await api.post("/auth/register", {username, email, password});
        const data = response.data;
        return data;
    }
    catch(err: any)
    {
        console.log(err);
    }

};