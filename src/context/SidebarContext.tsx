import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface SidebarContextType {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({children}: {children: ReactNode})=>{
    const [open, setOpen] = useState(true);

    return (
        <SidebarContext.Provider value={{open, setOpen}}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = ()=>{
    const context = useContext(SidebarContext);

    if(!context)
    {
        throw new Error("useSidebar must be used within the SidebarProvider");
    }

    return context;
}

