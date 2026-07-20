import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useAuth } from "./AuthContext";
import {uploadDraft} from "../utils/storyService";

export interface DraftType{
    id: string,
    user_id: number,
    content: string,
    username: string,
    upload_date: string,
    user_avatar: string
}

interface DraftContextType {
    saveDraft: (draft: DraftType, isEdited: boolean) => void,
    draft: DraftType[],
    setDraft: React.Dispatch<React.SetStateAction<DraftType[]>>,
    upload_Draft: (draft: DraftType)=> Promise<void>,
    // get_posts: ()=> Promise<DraftType[]>
}

const DraftContext = createContext<DraftContextType | undefined>(undefined);

export const DraftProvider = ({children}: {children: ReactNode})=>{
    const [draft, setDraft] = useState<DraftType[]>([]);
    const {user, loading} = useAuth();

    const loadStoredDrafts = ()=>{
        const storedDrafts = JSON.parse(localStorage.getItem("drafts") || "[]");
        const myDrafts = storedDrafts.filter(
            (d: { user_id: number }) => d.user_id == user?.id
        );
        setDraft(myDrafts);
    };

    useEffect(() => {
    // 1. If auth is still fetching the user session, do nothing yet
    if (loading || !user?.id) {
      return;
    }
    // const storedDrafts = JSON.parse(localStorage.getItem("drafts") || "[]");
    // const myDrafts = storedDrafts.filter(
    //   (d: { user_id: number }) => d.user_id == user.id
    // );
    // setDraft(myDrafts);
    loadStoredDrafts();

  }, [user?.id, loading]);

    const saveDraft = (new_draft: DraftType, isEdited: boolean) => {
        let updatedStateArray: DraftType[] = [];
        if (!isEdited) {
            // 1. Create the new local state array
            updatedStateArray = [...draft, new_draft];
        } else {
            const existingDraft = draft.find((d) => d.id == new_draft.id);
            if (existingDraft) {
                const updatedDraft = { ...existingDraft, ...new_draft };
                updatedStateArray = draft.map((d) => (d.id === updatedDraft.id ? updatedDraft : d));
            } else {
                // Fallback fallback if isEdited is true but it's a brand new ID
                updatedStateArray = [...draft, new_draft];
                }
            }
        // Update React state for instant UI changes
        setDraft(updatedStateArray);
        // 2. SAFE STORAGE CONCURRENCY: Fetch the total global drafts array from storage
        const allGlobalDrafts: DraftType[] = JSON.parse(localStorage.getItem("drafts") || "[]");
        // Filter out any older versions of the drafts this specific user just touched
        const cleanGlobalDrafts = allGlobalDrafts.filter(
            (gDraft) => !updatedStateArray.some((uDraft) => uDraft.id === gDraft.id)
        );

        // Combine the un-touched drafts (other users) with the active user's updated subset
        const finalizedStorageArray = [...cleanGlobalDrafts, ...updatedStateArray];
        // Save the full global array persistently
        localStorage.setItem("drafts", JSON.stringify(finalizedStorageArray));
    };

    const upload_Draft = async(draft: DraftType)=>{
        const data = await uploadDraft(draft);
        console.log(data);
    }

    return (
        <DraftContext.Provider value={{
            draft,
            saveDraft,
            setDraft,
            upload_Draft,
            // get_posts,
        }}>
            {children}
        </DraftContext.Provider>
    );
};
export const useDrafts = ()=>{
    const context = useContext(DraftContext);

    if(!context)
    {
        throw new Error("useDrafts must only be used within a draft provider");
    }

    return context;
};