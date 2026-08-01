import api from "../api/api";
import type { DraftType } from "../context/DraftContext";

export const uploadDraft =  async(draft: DraftType)=>{
    try{
        console.log("Sending draft:", draft);
        const response = await api.post("/me/stories/publish", draft);
        const data = await response.data;
        return data;
    } catch(err)
    {
        console.log("Error with the backend", err);
    }

};

export const fetchFypPosts = async()=>{
    try{
        const response = await api.get("/me/stories/fyp");
        const data = await response.data;
        // console.log("Data recieved in the frontend for your fyp:", data);
        return data;
    } catch(error)
    {
        console.log("Error with the backend while connecting", error);
    }
};

export const getMyPublishedStories = async()=>{
    try{
        const response = await api.get("/me/stories/published");
        const data = response.data;
        // console.log("data recieved from the backend:", data);
        return data;
    } catch(error)
    {
        console.log("Error thrown from the backend and caught in utils:", error);
    }
}