import type { formValue } from "../components/LoginForm";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const loginUser = async(param: formValue)=>{
    // const param = JSON.parse(email, password);
    // const param = JSON.stringify({email: email, password: password});
    console.log(param);
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(param)
    });

    const data = await response.json();
    
    if(!response.ok)
    {
        throw new Error(data.message);
    }

    return data;
};

export const registerUser = async(username: String, email: String, password: String)=>{
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username, email, password})
    });

    const data = await response.json();

    if(!response.ok)
    {
        throw new Error(data.message);
    }

    return data;
}