import type { formValue } from "../components/LoginForm";
import api from "../api/api";

export const loginUser = async(param: formValue)=>{
    // console.log("Login function called!");
    try{
        const response = await api.post("/auth/login", param);
        const data = response.data;
        return data;
    }

    catch(err)
    {
        console.log("error from the backend", err);
    }

};

export const registerUser = async(username: string, email: string, password: string)=>{
    try{
        const response = await api.post("/auth/register", {username, email, password});
        const data = response.data;
        console.log("User: ", data.user);
        return data;
    }
    catch(err)
    {
        console.log(err);
    }

};